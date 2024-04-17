import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import { Modal as AntdModal, Spin } from 'antd';
import { ModalProps as AntdModalProps } from 'antd';

interface Options {
  afterShowModal?(): void | Promise<void>;
}
export interface ModalRef {
  showModal(options?: Options): Promise<void>;
  closeModal(): void;
}
export interface ModalProps extends Omit<AntdModalProps, 'onOk' | 'onCancel'> {
  onOk?: OnOkType;
  onCancel?(): void | Promise<void>;
}
export type OnOkType = (
  event: React.MouseEvent<HTMLElement> & { stopClose: () => void }
) => void | Promise<void>;

const CusModal: ForwardRefRenderFunction<ModalRef, ModalProps> = (props, ref) => {
  const { children, onOk, onCancel, ...reset } = props;
  const [spinning, setSpinning] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const isStop = useRef<boolean>(false);
  const stopClose = useCallback(() => {
    isStop.current = true;
  }, []);
  const handleOnOK = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      setConfirmLoading(true);
      onOk && (await onOk({ ...event, stopClose }));
      setConfirmLoading(false);
      if (isStop.current) isStop.current = false;
      else setVisible(false);
    },
    [onOk, stopClose]
  );
  const handleOnCancel = useCallback(() => {
    onCancel && onCancel();
    setVisible(false);
  }, [onCancel]);
  useImperativeHandle(ref, () => ({
    async showModal(options = {}) {
      const { afterShowModal } = options;
      setVisible(true);
      if (afterShowModal) {
        setSpinning(true);
        await afterShowModal();
        setSpinning(false);
      }
    },
    closeModal() {
      setVisible(false);
    }
  }));
  return (
    <AntdModal
      {...reset}
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={handleOnOK}
      onCancel={handleOnCancel}
    >
      <Spin spinning={spinning}>{children}</Spin>
    </AntdModal>
  );
};

export default forwardRef(CusModal);
