export enum ShapeType {
  BOX = "box",
  CIRCLE = "circle",
}

export const SHAPE_COUNT = 4;
export const SHAPE_ID = "blue-shape";
export interface ShapePosition {
  [key: string]: Coordinates;
}

export interface Shape {
  r?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}

export interface Coordinates {
  x: number;
  y: number;
  width?: number;
  height?: number;
}

export interface Shape {
  r?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}

export interface ShapeData {
  id?: string;
  index: number;
  coords: Coordinates;
}

export interface ShapeProps {
  id: string;
  shapeType: ShapeType;
  shapes: ShapeData[];
  setShapes: React.Dispatch<React.SetStateAction<ShapeData[]>>;
  isOverlappingTarget: (coords: Coordinates) => boolean;
}
