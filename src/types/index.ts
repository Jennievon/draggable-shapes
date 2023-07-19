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

export interface ShapeProps {
  id: string;
  shapeType: ShapeType;
  position?: Coordinates;
  onDragStart: React.DragEventHandler<HTMLDivElement>;
  onDragEnd: React.DragEventHandler<HTMLDivElement>;
}
