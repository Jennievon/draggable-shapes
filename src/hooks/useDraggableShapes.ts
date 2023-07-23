import React, { useState, useEffect, useRef } from "react";
import { Coordinates, SHAPE_COUNT, ShapeData, ShapeType } from "../types";
import { isPositionInShape, getShapes } from "@/class";
import { debounce } from "lodash";

const shapeCache = new Set<string>();
const hash = (point: Coordinates) => `cache-${point.x}-${point.y}`;

const useDraggableShapes = ({
  redBoxRef,
}: {
  redBoxRef: React.RefObject<HTMLDivElement>;
}) => {
  const redBox = redBoxRef.current;
  const redBoxCoords = redBox?.getBoundingClientRect();

  const [shapeType, setShapeType] = useState<ShapeType>(ShapeType.BOX);

  const shapeRef = useRef<number[]>([...Array(SHAPE_COUNT)]).current;
  const [shapes, setShapes] = React.useState<ShapeData[]>(() =>
    Array.from(new Array(SHAPE_COUNT)).map((_, i) => ({
      index: i + 1,
      coords: { x: 0, y: 0, width: 0, height: 0 },
      visible: false,
    }))
  );

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

  shapeCache.clear();
  let hiddenArea = 0;

  if (redBox) {
    const redBoxTop = redBox.offsetTop;
    const redBoxLeft = redBox.offsetLeft;

    const getHiddenArea = (size: number, startPoint: Coordinates) => {
      let hiddenPixels = 0;
      let position = { ...startPoint };
      let initialXState = position.x;

      const blueShapes = getShapes(shapeType, shapeRef);

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          position.x += 1;

          for (let shape of blueShapes) {
            if (shapeCache.has(hash(position))) {
              continue;
            }

            if (isPositionInShape(position, shape)) {
              shapeCache.add(hash(position));
              hiddenPixels += 1;
            }
          }
        }
        position.y += 1;
        position.x = initialXState;
      }

      return hiddenPixels;
    };

    hiddenArea = getHiddenArea(redBox.offsetHeight, {
      x: redBoxLeft,
      y: redBoxTop,
    });
  }

  return {
    hiddenArea,
    shapeType,
    setShapeType,
    isOverlappingTarget,
    shapes,
    setShapes,
  };
};

export default useDraggableShapes;
