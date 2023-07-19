import { useState } from "react";
import { ShapePosition } from "../types";

const useDraggableShapes = ({
  initialTotalArea = 0,
}: {
  initialTotalArea?: number;
}) => {
  const [totalArea, setTotalArea] = useState(initialTotalArea);
  const [shapesPosition, setShapesPosition] = useState<ShapePosition>({});

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", e.currentTarget.id);
    e.currentTarget.style.cursor = "grabbing";
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.cursor = "grab";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data) as HTMLDivElement;

    if (draggedElement) {
      const draggedRect = draggedElement.getBoundingClientRect();
      const newX = e.clientX - draggedRect.width / 2;
      const newY = e.clientY - draggedRect.height / 2;

      // Update the position of the dragged element in the state
      setShapesPosition({
        ...shapesPosition,
        [draggedElement.id]: { x: newX, y: newY },
      });
      setTotalArea(totalArea + draggedRect.width * draggedRect.height);
    } else {
      alert("Dragged element not found");
    }
  };

  const resetShapes = () => {
    setShapesPosition({});
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return {
    shapesPosition,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleDragOver,
    resetShapes,
    totalArea,
  };
};

export default useDraggableShapes;
