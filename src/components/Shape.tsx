import { SHAPE_ID, ShapeProps } from "@/types";
import React from "react";
import { useDraggable } from "use-draggable";

const Shape: React.FC<ShapeProps> = ({
  id,
  shapes,
  setShapes,
  shapeType,
  isOverlappingTarget,
}) => {
  const { targetRef, handleRef } = useDraggable({ controlStyle: true });

  const shapeIndex = Number(id?.split(SHAPE_ID)[1]) - 1;
  const shape = shapes[shapeIndex];

  React.useEffect(
    () => {
      const coords = targetRef.current?.getBoundingClientRect();
      if (coords) {
        shape.coords = {
          x: coords.x,
          y: coords.y,
          width: coords.width,
          height: coords.height,
        };
        isOverlappingTarget(shape.coords);
      }
      setShapes([...shapes]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [targetRef.current]
  );

  return (
    <div id={id} ref={targetRef}>
      <div ref={handleRef} className={`blue ${shapeType}`} />
    </div>
  );
};

export default Shape;
