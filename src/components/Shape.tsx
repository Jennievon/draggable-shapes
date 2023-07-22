import { ShapeProps } from "@/types";
import React from "react";
import { useDraggable } from "use-draggable";

const Shape: React.FC<ShapeProps> = ({
  id,
  shapeType,
  isOverlappingTarget,
  shapes,
  setShapes,
}) => {
  const { targetRef, handleRef } = useDraggable({ controlStyle: true });

  const shapeIndex = Number(id?.split("blue-shape")[1]) - 1;
  const shape = shapes[shapeIndex];

  React.useEffect(() => {
    const coords = targetRef.current?.getBoundingClientRect();
    if (coords) {
      shape.coords = {
        x: coords.x,
        y: coords.y,
        width: coords.width,
        height: coords.height,
      };
    }
    const isVisible = isOverlappingTarget(shape.coords);

    if (shape.visible !== isVisible) {
      shapes[shapeIndex].visible = isVisible;
      setShapes([...shapes]); // Trigger a state update to re-render the shapes
    }
  }, [targetRef, isOverlappingTarget, shapeIndex, shape, shapes, setShapes]);

  return (
    <div id={id} ref={targetRef} data-testid={id}>
      <div
        ref={handleRef}
        className={`${shape.visible ? "yellow" : "blue"} ${shapeType}`}
      />
    </div>
  );
};

export default Shape;
