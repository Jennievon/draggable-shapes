import { Coordinates, SHAPE_ID } from "@/types";

interface PixelCache {
  [key: string]: Record<string, boolean>;
}

// Base Shape interface
interface Shape {
  isPointInside(pos: Coordinates): boolean;
}

const pixelsInCircles: PixelCache = {};

export class Box implements Shape {
  private x1: number;
  private y1: number;
  private x2: number;
  private y2: number;

  constructor(size: number, startPoint: Coordinates) {
    this.x1 = startPoint.x;
    this.y1 = startPoint.y;
    this.x2 = startPoint.x + size;
    this.y2 = startPoint.y + size;
  }

  isPointInside(pos: Coordinates) {
    return (
      pos.x >= this.x1 && pos.x < this.x2 && pos.y >= this.y1 && pos.y < this.y2
    );
  }

  static getBoxes(boxes: number[]) {
    return boxes
      .map(
        (_, index) =>
          document.querySelector(`#${SHAPE_ID}${index + 1}`) as HTMLDivElement
      )
      .filter((e) => e)
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return new Box(rect.height, {
          x: rect.x,
          y: rect.y,
        });
      });
  }
}

export class Circle implements Shape {
  private centerX: number;
  private centerY: number;
  private radius: number;

  constructor(size: number, startPoint: Coordinates) {
    this.centerX = startPoint.x + size / 2;
    this.centerY = startPoint.y + size / 2;
    this.radius = size / 2;
  }

  isPointInside(pos: Coordinates) {
    const distance = Math.sqrt(
      (pos.x - this.centerX) ** 2 + (pos.y - this.centerY) ** 2
    );
    return distance <= this.radius;
  }

  static getCircles(shapes: number[]) {
    return shapes
      .map(
        (_, index) =>
          document.querySelector(`#${SHAPE_ID}${index + 1}`) as HTMLDivElement
      )
      .filter((e) => e)
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return new Circle(rect.height, {
          x: rect.x,
          y: rect.y,
        });
      });
  }

  static getPixelsInCircle(centerX: number, centerY: number, radius: number) {
    const key = `${centerX}-${centerY}-${radius}`;
    if (!pixelsInCircles[key]) {
      pixelsInCircles[key] = Circle.calculatePixels(centerX, centerY, radius);
    }
    return pixelsInCircles[key];
  }

  private static calculatePixels(
    centerX: number,
    centerY: number,
    radius: number
  ) {
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

export function isPointInsideShape(pos: Coordinates, shape: Shape) {
  return shape.isPointInside(pos);
}

export function getShapes(shapeType: string, shapes: number[]) {
  if (shapeType === "box") {
    return Box.getBoxes(shapes);
  } else {
    return Circle.getCircles(shapes);
  }
}
