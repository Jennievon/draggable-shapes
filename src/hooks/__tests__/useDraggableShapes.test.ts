import { render, fireEvent, cleanup } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useDraggableShapes from "../useDraggableShapes";

// Mocking window.document to avoid errors in the tests
Object.defineProperty(window, "document", {
  value: {
    getElementById: jest.fn(),
    addEventListener: jest.fn(),
  },
  writable: true,
});

describe("useDraggableShapes hook", () => {
  it("should update shapesPosition on drag and drop", () => {
    const { result } = renderHook(() => useDraggableShapes());

    const blueShape1 = document.createElement("div");
    blueShape1.id = "blue-shape1";
    const blueShape2 = document.createElement("div");
    blueShape2.id = "blue-shape2";

    document.getElementById = jest
      .fn()
      .mockReturnValueOnce(blueShape1)
      .mockReturnValueOnce(blueShape2);

    const redBox = document.createElement("div");
    redBox.id = "red-box";
    redBox.getBoundingClientRect = jest.fn().mockReturnValue({
      width: 100,
      height: 100,
    });

    fireEvent.dragStart(blueShape1);
    fireEvent.drop(redBox);

    expect(result.current.shapesPosition).toHaveProperty("blue-shape1");
    expect(result.current.shapesPosition["blue-shape1"]).toEqual({
      x: expect.any(Number),
      y: expect.any(Number),
    });
  });

  it("should calculate totalArea and visibleArea on shape and red box size change", () => {
    const { result } = renderHook(() => useDraggableShapes());

    const redBox = document.createElement("div");
    redBox.id = "red-box";
    redBox.getBoundingClientRect = jest.fn().mockReturnValue({
      width: 200,
      height: 200,
    });

    const blueShape1 = document.createElement("div");
    blueShape1.id = "blue-shape1";
    blueShape1.getBoundingClientRect = jest.fn().mockReturnValue({
      width: 50,
      height: 50,
    });

    document.getElementById = jest
      .fn()
      .mockReturnValueOnce(redBox)
      .mockReturnValueOnce(blueShape1);

    fireEvent.drop(blueShape1);

    expect(result.current.totalArea).toBe(40000);
    expect(result.current.visibleArea).toBe(39900); // TotalArea - HiddenArea
  });
});

afterEach(() => {
  cleanup();
});
