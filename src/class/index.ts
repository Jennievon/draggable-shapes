import { Coordinates } from "@/types";

interface PixelCache {
  [key: string]: Record<string, boolean>;
}

// Base Shape interface
interface IShape {
  getPixels(
    x: number,
    y: number,
    width: number,
    height: number
  ): Record<string, boolean>;
  getCoordinates(
    x: number,
    y: number,
    width: number,
    height: number
  ): Coordinates;
}

class Box {
  getPixels(
    x: number,
    y: number,
    width: number,
    height: number
  ): Record<string, boolean> {
    const hashMap = {} as Record<string, boolean>;
    for (let b = 0; b < height; b++) {
      for (let a = 0; a < width; a++) {
        hashMap[`${x + a},${y + b}`] = true;
      }
    }
    return hashMap;
  }
  getCoordinates(x: number, y: number, width: number, height: number) {
    return { x, y, width, height };
  }
}

class Circle {
  getPixels(
    x: number,
    y: number,
    width: number,
    height: number
  ): Record<string, boolean> {
    const hashMap = {} as Record<string, boolean>;
    return this._getPixelsInCircle(x, y, width / 2);
  }

  getCoordinates(x: number, y: number, width: number, height: number) {
    return {
      x: x - width / 2,
      y: y - width / 2,
      width,
      height,
    };
  }

  _getPixelsInCircle(centerX: number, centerY: number, radius: number) {
    const key = `${centerX}-${centerY}-${radius}`;
    if (!pixelsInCircles[key]) {
      pixelsInCircles[key] = this._calculatePixels(centerX, centerY, radius);
    }
    console.log("🚀 ~ file: index.ts:98 ~ pixelsInCircles:", pixelsInCircles);
    return pixelsInCircles[key];
  }

  _calculatePixels(centerX: number, centerY: number, radius: number) {
    const pixels = [] as Record<string, any>[];

    // Loop through all the pixels in the circle
    for (let x = centerX - radius; x <= centerX + radius; x++) {
      for (let y = centerY - radius; y <= centerY + radius; y++) {
        // Calculate the distance between the pixel and the center
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

        // If the distance is less than the radius, the pixel is in the circle
        if (distance <= radius) {
          pixels.push({ x, y });
        }
      }
    }

    // Return all the pixels in the circle
    return pixels.reduce((accumulator, current) => {
      if (!accumulator[`${current.x},${current.y}`]) {
        accumulator[`${current.x},${current.y}`] = true;
      }
      return accumulator;
    }, {});
  }
}

const pixelsInCircles: PixelCache = {};
export class Shapes {
  shapeType: string;
  shape: IShape;

  constructor(shapeType: string) {
    this.shapeType = shapeType;
    if (shapeType === "circle") {
      this.shape = new Circle();
    }
    this.shape = new Box();
  }

  static getCoordinates(
    x: number,
    y: number,
    width: number,
    height: number
  ): Coordinates {
    return this.getCoordinates(x, y, width, height);
  }
  getPixelsInShapes(
    x: number,
    y: number,
    width: number,
    height: number
  ): Record<string, boolean> {
    return this.shape.getPixels(x, y, width, height);
  }
}
