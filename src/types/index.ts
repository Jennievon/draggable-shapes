export enum ShapeType {
  BOX = "box",
  CIRCLE = "circle",
}

export interface ShapePosition {
  [key: string]: Coordinates;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface Shape {
  r?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}

export interface ShapeProps {
  id: string;
  shapeType: ShapeType;
  position?: Coordinates;
  isOverlappingTarget: (coords: any) => boolean;
}
