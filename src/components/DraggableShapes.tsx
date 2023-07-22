import React from "react";
import Shape from "./Shape";
import { SHAPE_ID, ShapeType } from "../types";
import useDraggableShapes from "../hooks/useDraggableShapes";

const DraggableShapes = () => {
  const redBoxRef = React.useRef<HTMLDivElement>(null);
  const {
    visibleArea,
    shapes,
    setShapes,
    totalArea,
    shapeType,
    setShapeType,
    isOverlappingTarget,
  } = useDraggableShapes({ redBoxRef });

  const [sequence, setSequence] = React.useState(1);

  const handleShapeChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setShapeType(e.target.value as ShapeType);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="drag-area">
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
        <button onClick={() => setSequence(sequence + 1)}>Reset</button>
      </div>
      <div className="shapes-container">
        <div>
          {shapes.map(({ index }) => {
            const id = `${SHAPE_ID}${index}`;
            return (
              <Shape
                id={id}
                key={`${SHAPE_ID}${sequence * index}`}
                shapeType={shapeType}
                shapes={shapes}
                setShapes={setShapes}
                isOverlappingTarget={isOverlappingTarget}
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

export default DraggableShapes;
