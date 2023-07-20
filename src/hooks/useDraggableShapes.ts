import { useState, useEffect, useRef } from "react";
import { Coordinates, ShapePosition, ShapeType } from "../types";
import { isPointInsideShape, isOverlapping, getShapes } from "@/class";

const shapeCache = new Set<string>();
const hash = (point: Coordinates) => `cache-${point.x}-${point.y}`;

const useDraggableShapes = () => {
  const [shapesPosition, setShapesPosition] = useState<ShapePosition>({});
  const [totalArea, setTotalArea] = useState(0);
  const [visibleArea, setVisibleArea] = useState(0);
  const [draggedRect, setDraggedRect] = useState<DOMRect | null>(null);
  const shapeRef = useRef<number[]>([...Array(4)]).current;
  const [shapeType, setShapeType] = useState<ShapeType>(ShapeType.BOX);

  // Handle the change of the shape type
  const handleShapeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setShapeType(e.target.value as ShapeType);
  };

  // Handle the drag start event
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", e.currentTarget.id);
    e.currentTarget.style.cursor = "grabbing";
  };

  // Handle the drag end event
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.cursor = "grab";
  };

  // Handle the drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data) as HTMLDivElement;

    if (!draggedElement) {
      console.log("Dragged element not found");
      return;
    }

    const draggedRect = draggedElement.getBoundingClientRect();
    setDraggedRect(draggedRect);

    // Calculate the new position of the dragged element
    const newX = e.clientX - draggedRect.width / 2;
    const newY = e.clientY - draggedRect.height / 2;

    // Update the position of the dragged element
    setShapesPosition((prevPositions) => ({
      ...prevPositions,
      [draggedElement.id]: {
        x: newX,
        y: newY,
      },
    }));
  };

  // Reset the shapes position to the initial state
  const resetShapes = () => {
    setShapesPosition({});
  };

  // Handle the drag over event
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const redBox = document.getElementById("red-box") as HTMLDivElement;

    shapeCache.clear();

    // Calculate the total area of the red box
    const redBoxRect = redBox.getBoundingClientRect();
    const totalArea = redBoxRect.width * redBoxRect.height;
    setTotalArea(totalArea);

    if (!redBox || !draggedRect) {
      return;
    }

    // check if the dragged element is inside the red box before calculating the hidden area
    if (!isOverlapping(draggedRect, redBox.getBoundingClientRect())) {
      return;
    }

    const redBoxTop = redBox.offsetTop;
    const redBoxLeft = redBox.offsetLeft;

    const getHiddenArea = (
      size: number,
      startPoint: {
        x: number;
        y: number;
      }
    ) => {
      let hiddenPixels = 0;
      let position = { ...startPoint };
      let initialXState = position.x;

      const blueShapes = getShapes(shapeType, shapeRef);

      console.time("before");
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          position.x += 1;

          for (let shape of blueShapes) {
            if (shapeCache.has(hash(position))) continue;

            if (isPointInsideShape(position, shape)) {
              shapeCache.add(hash(position));
              hiddenPixels += 1;
            }
          }
        }
        position.y += 1;
        position.x = initialXState;
      }
      console.timeEnd("before");

      console.log({ hiddenPixels });
      return hiddenPixels;
    };

    const hiddenArea = getHiddenArea(redBox.offsetHeight, {
      x: redBoxLeft,
      y: redBoxTop,
    });

    setVisibleArea(totalArea - hiddenArea);
  }, [shapesPosition, draggedRect, shapeRef, shapeType]);

  return {
    shapesPosition,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleDragOver,
    resetShapes,
    totalArea,
    visibleArea,
    shapeRef,
    handleShapeChange,
    shapeType,
  };
};

export default useDraggableShapes;
