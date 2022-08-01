import { message } from 'antd';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler
} from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.AXIOS_BASE_URL,
  withCredentials: true,
  timeout: import.meta.env.AXIOS_TIMEOUT,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

const limitDuplicateRequestUrls: string[] = [];

const requestMap = new Map<string, Canceler>();

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const url = config.url;
  if (url && limitDuplicateRequestUrls.indexOf(url) !== -1) {
    if (requestMap.has(url)) {
      const cancel: Canceler = requestMap.get(url) as Canceler;
      cancel();
    }
    config.cancelToken = new axios.CancelToken(function (cancel: Canceler) {
      requestMap.set(url, cancel);
    });
  }
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    requestMap.delete(response.config.url as string);
    return response;
  },
  (error: AxiosError) => {
    requestMap.delete(error.config.url as string);
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      message.error('请求超时，请重试。').then();
    } else {
      const response = error.response;
      const status = response?.status;
      switch (status) {
        case 401:
        case 403:
          message.error('鉴权失败，请重新登录。').then();
          break;
        case 404:
        case 500:
        case 502:
        case 503:
        case 504:
          message.error('服务异常，请稍后再试。').then();
          break;
        default:
          break;
      }
    }
    return Promise.reject(error.response);
  }
);

type ResponseType = {
  code: number | string;
  msg?: string;
  data: any;
};

export function cusRequest<D>(
  method: 'get' | 'post' | 'delete',
  url: string,
  params: object = {}
): Promise<D> {
  let request: AxiosPromise<ResponseType>;
  switch (method) {
    case 'get':
      request = instance.get(url, { params: params });
      break;
    case 'post':
      request = instance.post(url, params);
      break;
    case 'delete':
      request = instance.delete(url, { data: params });
      break;
  }

  return new Promise((resolve, reject) => {
    request
      .then((response: AxiosResponse<ResponseType>) => {
        const basic = response.data;
        if (basic && basic.code == 0) {
          resolve(basic.data as D);
        } else {
          throw new Error(basic.msg);
        }
      })
      .catch((reason: AxiosResponse | Error) => {
        const msg = (reason as Error)?.message || (reason as AxiosResponse)?.statusText;
        reject(msg);
      });
  });
}

export function mGet<D>(url: string, params: object = {}): Promise<D> {
  return cusRequest<D>('get', url, params);
}

export function mPost<D>(url: string, data: object = {}): Promise<D> {
  return cusRequest<D>('post', url, data);
}

export function mDelete<D>(url: string, data: object = {}): Promise<D> {
  return cusRequest<D>('delete', url, data);
}
