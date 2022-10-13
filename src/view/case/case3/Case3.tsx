import React from 'react';
import { UserInfo } from '@/api/global/constant';
import { UserContext } from '@/layout/BaseLayout';

const Case3 = () => {
  
  const user: UserInfo | undefined = React.useContext(UserContext);

  return (
    <>
      showCase3 createContext and useContext
      <div>userId: {user?.userId}</div>
      <div>userName: {user?.userName}</div>
    </>
  );
};

export default Case3;
