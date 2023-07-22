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
  width: number;
  height: number;
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
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
  coords: Coordinates; // Replace Coordinates with the actual type for shape coordinates
  visible?: boolean;
}

export interface ShapeProps {
  id: string;
  shapeType: ShapeType;
  position?: Coordinates;
  isOverlappingTarget: (coords: any) => boolean;
  shapes: ShapeData[];
  setShapes: (shapes: ShapeData[]) => void;
}
