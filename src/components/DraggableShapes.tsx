import React, { useState, useEffect } from "react";
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
  } = useDraggableShapes();

  const [shapeType, setShapeType] = useState<ShapeType>(ShapeType.BOX);
  const redBoxRef = React.useRef<HTMLDivElement>(null);
  const [totalArea, setTotalArea] = useState(0);
  const [visibleArea, setVisibleArea] = useState(0);

  const handleShapeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setShapeType(e.target.value as ShapeType);
  };

  useEffect(() => {
    if (redBoxRef.current) {
      const { width, height } = redBoxRef.current.getBoundingClientRect();
      setTotalArea(width * height);
    }

    // using intersection observer, calculate the visible area by checking if there is any intersection between the red box and the shapes
    // const observer = new IntersectionObserver((entries) => {
    //   const { width, height } = entries[0].intersectionRect;
    //   setVisibleArea(width * height);
    // });
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(
          "🚀 ~ file: DraggableShapes.tsx:39 ~ useEffect ~ entries:",
          entries
        );
        for (const entry of entries) {
          console.log(
            "🚀 ~ file: DraggableShapes.tsx:41 ~ useEffect ~ entry:",
            entry
          );
          if (entry.target === redBoxRef.current) {
            setVisibleArea(
              entry.intersectionRect.width * entry.intersectionRect.height
            );
          }
        }
      },
      { root: null }
    );

    observer.observe(redBoxRef.current as Element);

    return () => {
      observer.disconnect();
    };
  }, [shapesPosition]);

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
          <div id="red-box" ref={redBoxRef}></div>
          <p>Total Area: {totalArea} square pixels</p>
          <p>Visible Area: {visibleArea} square pixels</p>
        </div>
      </div>
    </div>
  );
};

export default DraggableBoxes;
