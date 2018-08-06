
export interface LabelData {
  id: any,
  class: string,
  text: string,
  x: number,
  y: number,
  transform?: string,
  "text-anchor"?: string,
  "dominant-baseline"?: string,
}

export interface LineData {
  id: any,
  class: string,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}

export interface TickData {
  id: any,
  class: string,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}
