import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useState
} from 'react';
import { Button, Modal as AntdModal, Spin, Steps } from 'antd';
import { ModalProps as AntdModalProps } from 'antd';

import DynamicComponent from './DynamicComponent';

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

const stepArr = [
  {
    title: '1',
    component: 'Step1'
  },
  {
    title: '2',
    component: 'Step2'
  },
  {
    title: '3',
    component: 'Step3'
  },
  {
    title: '4',
    component: 'Step4'
  },
  {
    title: '5',
    component: 'Step5'
  }
];

const DebugModal: ForwardRefRenderFunction<ModalRef, ModalProps> = (props, ref) => {
  const { onOk, onCancel, ...reset } = props;
  const [spinning, setSpinning] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const [currentStep, setCurrentStep] = useState<number>(0);
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };
  const [prevDisabled, setPrevDisabled] = useState<boolean>(false);
  const [nextDisabled, setNextDisabled] = useState<boolean>(false);

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
      <Spin spinning={spinning}>
        <Steps
          size="small"
          current={currentStep}
          items={stepArr.map((item) => ({ title: item.title }))}
        />
        <div>
          <DynamicComponent
            component={stepArr[currentStep].component}
            setPrevDisabled={setPrevDisabled}
            setNextDisabled={setNextDisabled}
          ></DynamicComponent>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            {currentStep !== 0 && (
              <Button disabled={prevDisabled} onClick={handlePrev}>
                上一步
              </Button>
            )}
          </div>
          <div>
            {currentStep !== stepArr.length - 1 && (
              <Button disabled={nextDisabled} onClick={handleNext}>
                下一步
              </Button>
            )}
          </div>
        </div>
      </Spin>
    </AntdModal>
  );
};

export default forwardRef(DebugModal);
