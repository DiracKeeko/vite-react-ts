import { useEffect, useState } from 'react';

/* 
自定义一个hook，用来获取网页当前的网络状态，需要具备以下要素：
1、返回的数据所需的ts类、监听网络变化的enum
2、获取网络状态
3、监听网络变化，并实时更新最新的网络状态
*/

export interface NetworkState {
  since?: Date; // 记录当时检测的时间
  online?: boolean; // 记录是否有网络
  rtt?: number; // 记录时延
  downlink?: number; // 记录下载速度(带宽)
  saveData?: boolean; // 记录是否有保存数据
  effectiveType?: string; // 记录网络类型
}

enum NetworkEventType {
  ONLINE = 'online',
  OFFLINE = 'offline',
  CHANGE = 'change'
}

function getConnection() {
  const nav = navigator as any;
  if (typeof nav !== 'object') return null;
  return nav.connection || nav.mozConnection || nav.webkitConnection;
}

function getConnectionProperty(): NetworkState {
  const c = getConnection();
  if (!c) return {};
  return {
    rtt: c.rtt,
    saveData: c.saveData,
    downlink: c.downlink,
    effectiveType: c.effectiveType
  };
}

function useNetwork(): NetworkState {
  const [state, setState] = useState<NetworkState>(() => {
    return {
      since: undefined,
      online: navigator?.onLine,
      ...getConnectionProperty()
    };
  });

  useEffect(() => {
    const onOnline = () => {
      setState((prevState) => ({
        ...prevState,
        online: true,
        since: new Date()
      }));
    };

    const onOffline = () => {
      setState((prevState) => ({
        ...prevState,
        online: false,
        since: new Date()
      }));
    };

    const onConnectionChange = () => {
      setState((prevState) => ({
        ...prevState,
        ...getConnectionProperty()
      }));
    };

    window.addEventListener(NetworkEventType.ONLINE, onOnline);
    window.addEventListener(NetworkEventType.OFFLINE, onOffline);

    const connection = getConnection();
    connection?.addEventListener(NetworkEventType.CHANGE, onConnectionChange);

    return () => {
      window.removeEventListener(NetworkEventType.ONLINE, onOnline);
      window.removeEventListener(NetworkEventType.OFFLINE, onOffline);
      connection?.removeEventListener(NetworkEventType.CHANGE, onConnectionChange);
    };
  }, []);

  return state;
}

export default useNetwork;
