export type ApplyDataFn<T extends HTMLElement = any, Data = any> = (
  template: T,
  data: Data
) => void;
