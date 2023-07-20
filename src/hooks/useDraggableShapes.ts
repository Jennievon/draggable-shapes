import { useState, useEffect, useRef } from "react";
import { Coordinates, ShapePosition, ShapeType } from "../types";
import { isPointInsideShape, isOverlapping, getShapes } from "@/class";

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

  return {
    shapesPosition,
    totalArea,
    visibleArea,
    shapeRef,
    handleShapeChange,
    shapeType,
  };
};

export default useDraggableShapes;
