export interface Icon {
  gQuantity: number;
  color: string;
  viewBox: string;
  path: string;
  pathSecond?: string;
}

export enum levelNames {
  'A' = 1,
  '#id',
  'A B',
  '#id A',
  '.className',
  'A.className',
  'Put your back into it!',
  'A, B',
  '*',
  'A *',
}

export interface Level {
          selector: string,
          class?: string,
          id?: string,
          target?: boolean,
          child?: Level[]
}