type TypeEnum = 'core' | 'base' | 'trace';

type Reassign<T> = {
  [K in keyof T]: T[K];
};

type ColorMap = Reassign<Record<TypeEnum, string> & { [key: string]: string }>;

type SizeMap = Reassign<Record<TypeEnum, [number, number]> & { [key: string]: [number, number] }>;

const TYPE_COLOR_MAP: ColorMap = {
  core: '#6b705c', // 核心 蓝铁
  base: '#11bb55', // 基础 绿
  trace: '#ffaa64' // 追踪 橙
};

const TYPE_SIZE_MAP: SizeMap = {
  core: [220, 130],
  base: [220, 130],
  trace: [220, 130]
};

const COLOR_MAP: { [key: string]: string } = {
  warn: '#EC4234',
  active: '#f6c523',
  innerRoom: '#2d2686',
  outerRoom: '#FFD700',
  isProduction: '#1E90FF',
  isSelected: '#f57384'
};

type OtherInfo = {
  traceId: string;
  room: string;
  coreServiceUnit: string;
  coreInterfaceCode: string;
};

export { COLOR_MAP, TYPE_COLOR_MAP, TYPE_SIZE_MAP };
