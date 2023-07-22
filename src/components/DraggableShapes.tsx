import React from "react";
import Shape from "./Shape";
import { Coordinates, ShapeData, ShapeType } from "../types";
import useDraggableShapes from "../hooks/useDraggableShapes";
import { Shapes } from "@/class";

const DraggableShapes = () => {
  const { shapeType, handleShapeChange } = useDraggableShapes();

  const [shapes, setShapes] = React.useState<ShapeData[]>(() =>
    Array.from(new Array(4)).map((_, i) => ({
      index: i + 1,
      coords: { x: 0, y: 0, width: 0, height: 0 },
      visible: false,
    }))
  );

  const redBoxRef = React.useRef<HTMLDivElement>(null);
  const [sequence, setSequence] = React.useState(1);
  const [visibleArea, setVisibleArea] = React.useState(0);

  const redBox = redBoxRef.current;
  const redBoxCoordsRealValues = redBox?.getBoundingClientRect();

  const redBoxCoords = React.useMemo(() => {
    if (!redBoxCoordsRealValues) return null;

    return {
      bottom: Math.floor(redBoxCoordsRealValues?.bottom),
      left: Math.floor(redBoxCoordsRealValues?.left),
      right: Math.floor(redBoxCoordsRealValues?.right),
      top: Math.floor(redBoxCoordsRealValues?.top),
      width: Math.floor(redBoxCoordsRealValues?.width),
      height: Math.floor(redBoxCoordsRealValues?.height),
      x: Math.floor(redBoxCoordsRealValues?.x),
      y: Math.floor(redBoxCoordsRealValues?.y),
    };
  }, [redBoxCoordsRealValues]);

  const redBoxMap = () => {
    const hashMap: Record<string, boolean> = {};
    if (!redBoxCoords) return hashMap;

    for (let y = 0; y < redBoxCoords?.width; y++) {
      for (let x = 0; x < redBoxCoords?.width; x++) {
        hashMap[`${redBoxCoords?.left + x},${redBoxCoords?.top + y}`] = false;
      }
    }
    return hashMap;
  };

  const isOverlappingTarget = React.useCallback(
    (coords: any) => {
      if (!coords || !redBoxCoords) return false;

      const redBoxCoordsX = [redBoxCoords.left, redBoxCoords.right];
      const redBoxCoordsY = [redBoxCoords.top, redBoxCoords.bottom];

      const shapeCoordsX = [coords.x, coords.x + coords.width];
      const shapeCoordsY = [coords.y, coords.y + coords.height];

      const xOverlap =
        redBoxCoordsX[0] < shapeCoordsX[1] &&
        redBoxCoordsX[1] > shapeCoordsX[0];

      const yOverlap =
        redBoxCoordsY[0] < shapeCoordsY[1] &&
        redBoxCoordsY[1] > shapeCoordsY[0];

      return xOverlap && yOverlap;
    },
    [redBoxCoords]
  );

  const redBoxPixelsMap = new Map<string, boolean>();
  const hiddenPixelsMap = new Map<string, boolean>();

  React.useEffect(() => {
    if (!redBoxCoords) return;

    // Create a hashMap to keep track of all the pixels in the red box
    const redBoxPixelsMap: Record<string, boolean> = {};

    // Loop through the red box area and mark each pixel as visible
    for (let y = 0; y < redBoxCoords.height; y++) {
      for (let x = 0; x < redBoxCoords.width; x++) {
        redBoxPixelsMap[`${redBoxCoords.left + x},${redBoxCoords.top + y}`] =
          true;
      }
    }

    // Create an instance of the Shapes class
    const shapesHelper = new Shapes(shapeType);

    // Loop through each shape and calculate its pixels
    shapes.forEach(({ coords }) => {
      if (!coords) return;

      // Get the pixels for the current shape
      const shapePixels = shapesHelper.getPixelsInShapes(
        coords.x,
        coords.y,
        coords.width,
        coords.height
      );

      // Check if the shape overlaps with any pixel in the red box
      for (const pixel in shapePixels) {
        if (redBoxPixelsMap[pixel]) {
          console.log("pixel");
          // If the pixel is in the red box, mark it as visible in the shapePixelsMap
          redBoxPixelsMap[pixel] = false;
        }
      }
    });

    // Count the number of visible pixels in the red box
    const visibleArea = Object.values(redBoxPixelsMap).filter(
      (pixel) => !pixel
    ).length;
    console.log(
      "🚀 ~ file: DraggableShapes.tsx:123 ~ React.useEffect ~ visibleArea:",
      visibleArea
    );

    // Update the visibleArea state with the calculated value
    setVisibleArea(visibleArea);
  }, [shapes, redBoxCoords, shapeType]);

  let totalArea = redBoxCoords?.width! * redBoxCoords?.height!;

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
                isOverlappingTarget={(coords) => {
                  const shape = shapes.find(({ id }) => id === id);
                  if (!shape) return false;
                  shape.coords = coords;
                  return isOverlappingTarget(coords);
                }}
                shapes={shapes}
                setShapes={setShapes}
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
