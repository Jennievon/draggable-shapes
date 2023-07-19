import React from "react";
import { Coordinates, ShapeProps } from "../types";

const getShapeStyle = (id: string, position?: Coordinates) => {
  if (position) {
    return {
      position: "absolute",
      left: `${position.x}px`,
      top: `${position.y}px`,
    };
  } else {
    return {
      position: "relative",
    };
  }
};

const Shape: React.FC<ShapeProps> = ({
  id,
  shapeType,
  position,
  onDragStart,
  onDragEnd,
}) => {
  const className = `blue-${shapeType}`;
  const style = getShapeStyle(id, position);

  return (
    <div
      id={id}
      className={className}
      style={style as React.CSSProperties}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  );
};

export default Shape;
