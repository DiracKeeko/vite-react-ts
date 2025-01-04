type TypeEnum = 'preInspection' | 'problem' | 'inspection' | 'solution' | 'default';

type ColorMap = Record<TypeEnum, string> & { [key: string]: string };

type SizeMap = Record<TypeEnum, [number, number]> & { [key: string]: [number, number] };

const ACTIVE_COLOR = '#f6c523';

const COLOR_MAP: ColorMap = {
  preInspection: '#3fc1c9',
  problem: '#8983f3',
  inspection: '#f48db4',
  solution: '#ffaa64',
  default: '#11bb55'
};

const SIZE_MAP: SizeMap = {
  preInspection: [240, 120],
  problem: [200, 120],
  inspection: [330, 100],
  solution: [200, 120],
  default: [220, 130]
};

export { ACTIVE_COLOR, COLOR_MAP, SIZE_MAP };
