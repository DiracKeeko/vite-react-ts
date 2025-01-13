import { createSearchParams, useNavigate } from 'react-router-dom';

const specialParamKeyValueMap: {
  [key: string]: string;
} = {
  informationDetail: 'informationId' // informationDetail?informationId=001
};
const specialPathArr = Object.keys(specialParamKeyValueMap);

const useJumpFunc = () => {
  const navigate = useNavigate();
  // source: 可选值 '0', '1'  '1'哪里跳转，则回到哪里去 (需要toPage页面支持)
  const jumpTo = (pathKey: string, pathParams: { id: string; source: string }) => {
    const { id, source } = pathParams;
    let params = {};
    if (source) {
      params = { source };
    }
    if (specialPathArr.includes(pathKey)) {
      const specialKey = specialParamKeyValueMap[pathKey];
      params = {
        ...params,
        [specialKey]: id
      };
    } else {
      params = {
        ...params,
        id
      };
    }
    navigate({
      pathname: `/${pathKey}`,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      search: `?${createSearchParams(params)}`
    });
  };
  return jumpTo;
};

export default useJumpFunc;
