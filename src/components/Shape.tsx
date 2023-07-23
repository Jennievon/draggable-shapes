import { SHAPE_ID, ShapeProps } from "@/types";
import React, { useEffect, useRef } from "react";
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

  const previousPositionRef = useRef<DOMRect>();

  useEffect(() => {
    // Get the initial position of the element
    const initialPosition = targetRef.current?.getBoundingClientRect();
    if (initialPosition) {
      previousPositionRef.current = initialPosition;
    }

    // Create a MutationObserver to watch for changes to the targetRef
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          (mutation.attributeName === "style" ||
            mutation.attributeName === "class")
        ) {
          // Element position or size has changed
          const currentPosition = targetRef.current?.getBoundingClientRect();
          if (currentPosition && previousPositionRef.current) {
            // Check if the position has changed
            if (
              previousPositionRef.current.x !== currentPosition.x ||
              previousPositionRef.current.y !== currentPosition.y
            ) {
              previousPositionRef.current = currentPosition;
              shape.coords = {
                x: currentPosition.x,
                y: currentPosition.y,
                width: currentPosition.width,
                height: currentPosition.height,
              };
              isOverlappingTarget(shape.coords);
              setShapes([...shapes]);
            }
          }
        }
      }
    });

    // Start observing the targetRef
    if (targetRef.current) {
      observer.observe(targetRef.current, { attributes: true });
    }

    // Cleanup the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, [isOverlappingTarget, setShapes, shape, shapes, targetRef]);

  return (
    <div id={id} ref={targetRef}>
      <div ref={handleRef} className={`blue ${shapeType}`} draggable />
    </div>
  );
};

export default Shape;
