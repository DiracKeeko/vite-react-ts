import React from 'react';

import useNetwork, { NetworkState } from '@/hook/useNetwork';

const Home = () => {
  const networkState: NetworkState = useNetwork();
  // console.log('networkState->', networkState);

  return (
    <div>
      <div>HOME</div>
      <br />
      <p>Online: {networkState.online ? 'Yes' : 'No'}</p>
      <p>Effective Type: {networkState.effectiveType}</p>
      <p>RTT(延迟): {networkState.rtt}</p>
      <p>Downlink(MB/s): {networkState.downlink}</p>
    </div>
  );
};

export default Home;
