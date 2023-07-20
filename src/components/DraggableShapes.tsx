import React from "react";
import Shape from "./Shape";
import { ShapeType } from "../types";
import useDraggableShapes from "../hooks/useDraggableShapes";

const DraggableShapes = () => {
  const {
    shapesPosition,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleDragOver,
    resetShapes,
    shapeType,
    handleShapeChange,
    totalArea,
    visibleArea,
  } = useDraggableShapes();

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
        <button onClick={resetShapes} data-testid="reset-button">
          Reset
        </button>
      </div>
      <div className="shapes-container">
        <div>
          {[...Array(4)].map((_, i) => {
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
          <p data-testid="total-area">Total Area: {totalArea} square pixels</p>
          <p data-testid="visible-area">
            Visible Area: {visibleArea} square pixels
          </p>
        </div>
      </div>
    </div>
  );
};

export default DraggableShapes;
