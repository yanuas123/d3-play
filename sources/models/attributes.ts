export type TransformFunctions = 'translate' | 'rotate';

export interface TransformValueTypes {
  ['translate']: [number, number];
  ['rotate']: number;
}
