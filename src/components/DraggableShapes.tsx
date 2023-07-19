import React, { useState } from "react";
import Shape from "./Shape";
import { ShapeType } from "../types";
import useDraggableShapes from "../hooks/useDraggableShapes";

const DraggableBoxes = () => {
  const {
    shapesPosition,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleDragOver,
    resetShapes,
    totalArea,
  } = useDraggableShapes({
    initialTotalArea: 0,
  });

  const [shapeType, setShapeType] = useState<ShapeType>(ShapeType.BOX);

  const handleShapeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setShapeType(e.target.value as ShapeType);
  };

  return (
    <div className="drag-area" onDrop={handleDrop} onDragOver={handleDragOver}>
      <div>
        <label htmlFor="shape-select">Select Shape: </label>
        <select
          id="shape-select"
          value={shapeType}
          onChange={handleShapeChange}
        >
          <option value={ShapeType.BOX}>Boxes</option>
          <option value={ShapeType.CIRCLE}>Circles</option>
        </select>
        <button onClick={resetShapes}>Reset</button>
      </div>
      <div className="shapes-container">
        <div>
          {[...Array(5)].map((_, i) => {
            const id = `blue-shape${i + 1}`;
            return (
              <Shape
                id={id}
                key={id}
                position={shapesPosition[id]}
                shapeType={shapeType}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
              />
            );
          })}
        </div>
        <div>
          <div id="red-box"></div>
          <div id="total-area-label">Total Area: {totalArea} pixels</div>
        </div>
      </div>
    </div>
  );
};

export default DraggableBoxes;
