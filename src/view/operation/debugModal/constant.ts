type StepProps = {
  setPrevDisabled?: (val: boolean) => void;
  setNextDisabled?: (val: boolean) => void;
};

type ApiInfoItem = {
  apiId: string;
  serviceLabel: string;
  releaseCode: string;
  serverUrl: string;
  path: string;
  type: string;
  desc: string;
  author: string;
  registered: boolean;
};

export type { ApiInfoItem, StepProps };
