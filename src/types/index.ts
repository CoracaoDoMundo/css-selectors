export interface Icon {
  gQuantity: number;
  color: string;
  viewBox: string;
  path: string;
  pathSecond?: string;
  pathThird?: string;
}

export enum LevelNames {
  "Tag name selector" = 1,
  "Id selector (#id)",
  "Class selector (.class)",
  "Universal selector (*)",
  "Selector by attribute",
  "Selectors group by comma",
  "Element with class",
  "Nesting with space",
  "First adjacent element (+)",
  "Any adjacent element (~)",
}

export interface Level {
  selector: string;
  img: string;
  nesting: number;
  class?: string;
  id?: string;
  attribute?: string;
  target?: boolean;
  child?: Level[];
}

export interface Event {}

export type Cb = (event: Event) => void;

export type CbCheckOfAnswer = () => boolean;

export type CbDrawOrChangeLevel = (levelNum: number) => void;

export type CbHighlightOrRemoveLinkedElement = (value: string) => void;

export type CbFillViewerField = (activeLevel: number) => void;

export type CallbackEvent = {
  [key: string]: (
    | Cb
    | CbDrawOrChangeLevel
    | CbHighlightOrRemoveLinkedElement
    | CbFillViewerField
    | CbCheckOfAnswer
  )[];
};
