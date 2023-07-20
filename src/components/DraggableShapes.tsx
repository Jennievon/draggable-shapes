import React from "react";
import Shape from "./Shape";
import { Coordinates, ShapeType } from "../types";
import useDraggableShapes from "../hooks/useDraggableShapes";
import { getShapes, isPointInsideShape } from "@/class";

const shapeCache = new Set<string>();
const hash = (point: Coordinates) => `cache-${point.x}-${point.y}`;

const DraggableShapes = () => {
  const { shapeType, handleShapeChange } = useDraggableShapes();

  const shapes = Array.from(new Array(4)).map((_, i) => ({ index: i + 1 }));
  const [sequence, setSequence] = React.useState(1);
  const redBoxRef = React.useRef<HTMLDivElement>(null);

  const redBoxCoords = redBoxRef.current?.getBoundingClientRect();
  const isOverlappingTarget = React.useCallback(
    (coords: any) => {
      if (!coords || !redBoxCoords) return false;

      const redBoxCoordsX = [
        redBoxCoords.x,
        redBoxCoords.x + redBoxCoords.width,
      ];
      const redBoxCoordsY = [
        redBoxCoords.y,
        redBoxCoords.y + redBoxCoords.height,
      ];

      return (
        coords.x + coords.width >= redBoxCoordsX[0] &&
        coords.x <= redBoxCoordsX[1] &&
        coords.y + coords.width >= redBoxCoordsY[0] &&
        coords.y <= redBoxCoordsY[1]
      );
    },
    [redBoxCoords]
  );

  const [totalArea, setTotalArea] = React.useState(0);
  const [visibleArea, setVisibleArea] = React.useState(0);
  React.useEffect(() => {
    shapeCache.clear();

    if (!redBoxCoords || !redBoxRef.current) {
      return;
    }
    // Calculate the total area of the red box
    const totalArea = redBoxCoords.width * redBoxCoords.height;
    setTotalArea(totalArea);

    const redBoxTop = redBoxRef.current.offsetTop;
    const redBoxLeft = redBoxRef.current.offsetLeft;

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
  }, [isOverlappingTarget, redBoxCoords, redBoxRef, shapeType]);

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
        <button
          onClick={() => setSequence(sequence + 1)}
          data-testid="reset-button"
        >
          Reset
        </button>
      </div>
      <div className="shapes-container">
        <div>
          {shapes.map(({ index }) => {
            const id = `blue-shape${index}`;
            return (
              <Shape
                id={id}
                key={`blue-shape${sequence * index}`}
                shapeType={shapeType}
                isOverlappingTarget={isOverlappingTarget}
              />
            );
          })}
        </div>
        <div>
          <div id="red-box" ref={redBoxRef}></div>
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
