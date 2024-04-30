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

type UserInfo = {
  userId: string;
  name: string;
  mobile: string;
  email: string;
  position: string;
  sex: string;
  company: string;
  workState: string;
};

export type { ApiInfoItem, StepProps, UserInfo };
