import React, { useCallback, useRef, useState } from 'react';
import { Button } from 'antd';

import DebugModal from './debugModal/DebugModal';

const TabProduction = () => {
  const debugModalRef = useRef<React.ElementRef<typeof DebugModal>>(null);

  // 打开对话框
  const handleShowModal = useCallback((val: string) => {
    console.log("string->", val);
    debugModalRef.current?.showModal();
  }, []);

  return (
    <div>
      <h1>Tab Production</h1>
      <DebugModal
        destroyOnClose
        ref={debugModalRef}
        title="debugModal"
        width="80%"
      >
      </DebugModal>
      <Button onClick={() => handleShowModal("b")}>显示弹窗B</Button>
    </div>
  );
};

export default TabProduction;
