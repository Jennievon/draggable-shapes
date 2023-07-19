import useDraggableShapes from "../hooks/useDraggableShapes";

it("test_shapesPosition_initially_empty", () => {
  const { shapesPosition } = useDraggableShapes({});
  expect(shapesPosition).toEqual({});
});

it("test_handleDragStart_sets_cursor_to_grabbing", () => {
  const { handleDragStart } = useDraggableShapes({});
  const event = { currentTarget: { style: {} } };
  handleDragStart(event);
  expect(event.currentTarget.style.cursor).toEqual("grabbing");
});

it("test_handle_drop_alerts_when_dragged_element_not_found", () => {
  const { handleDrop } = useDraggableShapes({});
  const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
  const event = {
    preventDefault: jest.fn(),
    dataTransfer: {
      getData: jest.fn().mockReturnValue("non-existing-id"),
    },
  } as unknown as React.DragEvent<HTMLDivElement>;
  handleDrop(event);
  expect(alertSpy).toHaveBeenCalledWith("Dragged element not found");
  alertSpy.mockRestore();
});

// Tests that dragging an element updates its position in the state
it("test_dragging_updates_position", () => {
  const { result } = renderHook(() => useDraggableShapes());
  const { handleDragStart, handleDrop } = result.current;
  const div = document.createElement("div");
  div.id = "test-id";
  document.body.appendChild(div);

  act(() => {
    handleDragStart({
      currentTarget: div,
      dataTransfer: {
        setData: jest.fn(),
      },
    });
  });

  act(() => {
    handleDrop({
      preventDefault: jest.fn(),
      clientX: 100,
      clientY: 100,
      dataTransfer: {
        getData: jest.fn().mockReturnValue("test-id"),
      },
    });
  });

  expect(result.current.shapesPosition).toEqual({
    "test-id": { x: 50, y: 50 },
  });
});
