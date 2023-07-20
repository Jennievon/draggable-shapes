import React, { useState } from "react";
import { Coordinates, ShapeProps } from "../types";
import { useDraggable } from "use-draggable";

const Shape: React.FC<ShapeProps> = ({
  id,
  shapeType,
  isOverlappingTarget,
}) => {
  const { targetRef, handleRef } = useDraggable({ controlStyle: true });

  if (targetRef.current) {
    console.log(
      "The box coords are: ",
      targetRef.current.getBoundingClientRect()
    );
    console.log(
      "The box coords are: ",
      targetRef.current.getBoundingClientRect()
    );
  }

  return (
    <div id={id} ref={targetRef} data-testid={id}>
      <div
        ref={handleRef}
        className={`${
          isOverlappingTarget(targetRef.current?.getBoundingClientRect())
            ? "yellow"
            : "blue"
        } ${shapeType}`}
      />
    </div>
  );
};

export default Shape;
