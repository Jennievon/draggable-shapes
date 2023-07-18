"use client";

import React, { useState, useMemo } from "react";

enum ShapeType {
  BOX = "box",
  CIRCLE = "circle",
}

const DraggableBoxes = () => {
  const [totalArea, setTotalArea] = useState(20000);
  const [shapeType, setShapeType] = useState<ShapeType>(ShapeType.BOX);

  const handleShapeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShapeType(e.target.value as ShapeType);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", e.currentTarget.id);
    e.currentTarget.style.cursor = "grabbing";
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.cursor = "grab";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data);
    const redBox = document.getElementById("red-box") as HTMLDivElement;

    if (draggedElement && redBox) {
      const redBoxRect = redBox.getBoundingClientRect();
      const draggedRect = draggedElement.getBoundingClientRect();

      const overlapArea =
        Math.max(
          0,
          Math.min(redBoxRect.right, draggedRect.right) -
            Math.max(redBoxRect.left, draggedRect.left)
        ) *
        Math.max(
          0,
          Math.min(redBoxRect.bottom, draggedRect.bottom) -
            Math.max(redBoxRect.top, draggedRect.top)
        );

      setTotalArea(
        totalArea + draggedRect.width * draggedRect.height - overlapArea
      );

      redBox.appendChild(draggedElement);
      draggedElement.style.left = `${e.clientX - draggedRect.width / 2}px`;
      draggedElement.style.top = `${e.clientY - draggedRect.height / 2}px`;
    }
  };

  const memoizedShapes = useMemo(() => {
    return [...Array(5)].map((_, i) => {
      const id =
        shapeType === ShapeType.BOX
          ? `blue-box${i + 1}`
          : `blue-circle${i + 1}`;
      const className =
        shapeType === ShapeType.BOX ? "blue-box" : "blue-circle";

      return (
        <div
          key={id}
          id={id}
          className={className}
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      );
    });
  }, [shapeType]);

  return (
    <div className="container">
      <div>
        <label htmlFor="shape-select">Select Shape:</label>
        <select
          id="shape-select"
          value={shapeType}
          onChange={handleShapeChange}
        >
          <option value={ShapeType.BOX}>Boxes</option>
          <option value={ShapeType.CIRCLE}>Circles</option>
        </select>
      </div>
      <div id="blue-box-container">{memoizedShapes}</div>
      <div id="red-box" onDragOver={handleDragOver} onDrop={handleDrop}>
        <div id="total-area-label">Total Area: {totalArea} pixels</div>
      </div>
    </div>
  );
};

export default DraggableBoxes;
