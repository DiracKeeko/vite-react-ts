import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
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
  onOk?: (event: React.MouseEvent<HTMLElement>) => void | Promise<void>;
  onCancel?(): void | Promise<void>;
}

const CusModal: ForwardRefRenderFunction<ModalRef, ModalProps> = (props, ref) => {
  const { children, onOk, onCancel, ...reset } = props;
  const [spinning, setSpinning] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const wrapOnOk = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      setConfirmLoading(true);
      onOk && (await onOk({ ...event }));
      setConfirmLoading(false);
      setVisible(false);
    },
    [onOk]
  );
  const wrapOnCancel = useCallback(() => {
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
      onOk={wrapOnOk}
      onCancel={wrapOnCancel}
    >
      <Spin spinning={spinning}>{children}</Spin>
    </AntdModal>
  );
};

export default forwardRef(CusModal);
