import React, { useCallback, useRef, useState } from 'react';
import { Button } from 'antd';

import CusModal from '@/component/CusModal';

const TabProduction = () => {
  const [content, setContent] = useState<string>('');
  const modalRef = useRef<React.ElementRef<typeof CusModal>>(null);

  // 打开对话框
  const handleShowModal = useCallback((val: string) => {
    setContent(val);
    modalRef.current?.showModal();
  }, []);
  const handleOnOk = () => {
    console.log('ok');
  };
  // 取消
  const handleOnCancel = () => {
    console.log('cancel');
  };

  return (
    <div>
      <h1>Tab Production</h1>
      <CusModal
        destroyOnClose
        title="弹窗标题"
        ref={modalRef}
        onOk={handleOnOk}
        onCancel={handleOnCancel}
        okButtonProps={{
          style: {
            display: content ? '' : 'none'
          }
        }}
        bodyStyle={{
          height: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px'
        }}
      >
        {content}
      </CusModal>
      <Button onClick={() => handleShowModal("b")}>显示弹窗B</Button>
      <Button onClick={() => handleShowModal("c")}>显示弹窗C</Button>
    </div>
  );
};

export default TabProduction;
