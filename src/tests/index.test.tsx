import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import DraggableShapes from "../components/DraggableShapes";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

test("should reset shapes position when 'Reset' button is clicked", () => {
  const { debug } = render(<DraggableShapes />);

  // Wait for the component to be fully rendered and the draggable shape to be available
  const blueShape1 = screen.getByTestId("blue-shape1");
  debug();
  // Verify that the shape is draggable and set its position
  expect(blueShape1.draggable).toBe(true);
  fireEvent.dragStart(blueShape1);
  fireEvent.drop(blueShape1, { clientX: 100, clientY: 100 });

  // Verify that the shape position has changed
  expect(blueShape1.style.transform).toBe("translate(100px, 100px)");

  // Click the "Reset" button
  const resetButton = screen.getByTestId("reset-button");
  fireEvent.click(resetButton);

  // Verify that the shape position is reset to the initial state
  expect(blueShape1.style.transform).toBe("translate(0px, 0px)");
});

test("should display initial totalArea and visibleArea", () => {
  const { getByTestId } = render(<DraggableShapes />);

  expect(screen.getByText("Total Area: 0 square pixels")).toBeInTheDocument();
  expect(screen.getByText("Visible Area: 0 square pixels")).toBeInTheDocument();
});

test("should change the shape type on select change", () => {
  const { getByTestId } = render(<DraggableShapes />);

  const blueShape1 = screen.queryByTestId("blue-shape1");
  expect(blueShape1!.classList.contains("box")).toBe(true);

  const selectElement = screen.getByLabelText("Select Shape:");
  fireEvent.change(selectElement, { target: { value: "circle" } });

  expect(blueShape1!.classList.contains("circle")).toBe(true);
});

test("should update totalArea and visibleArea when a shape is removed from the red box", () => {
  const { getByTestId } = render(<DraggableShapes />);

  const blueShape1 = screen.queryByTestId("blue-shape1");
  fireEvent.dragStart(blueShape1!);
  fireEvent.drop(blueShape1!, { clientX: 100, clientY: 100 });

  const totalAreaElement = screen.getByTestId("total-area");
  const visibleAreaElement = screen.getByTestId("visible-area");
  expect(totalAreaElement.textContent).toBe("Total Area: 10000 square pixels");
  expect(visibleAreaElement.textContent).toBe(
    "Visible Area: 9900 square pixels"
  );

  blueShape1!.style.transform = ""; // Move the shape outside the red box
  fireEvent.drop(blueShape1!);

  expect(totalAreaElement.textContent).toBe("Total Area: 10000 square pixels");
  expect(visibleAreaElement.textContent).toBe(
    "Visible Area: 10000 square pixels"
  );
});
