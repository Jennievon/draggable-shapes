# Draggable Boxes - Next.js

This project demonstrates draggable boxes in a Next.js application. Users can interact with blue boxes by dragging them around the screen and dropping them into different positions. The red box represents the target area, and the total visible area within the red box is calculated based on the positioning of the blue boxes.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/Jennievon/draggable-shapes.git
   ```

2. Navigate to the project directory:

   ```shell
   cd draggable-shapes
   ```

3. Install the dependencies:

   ```shell
   npm install
   ```

4. Start the development server:

   ```shell
   npm run dev
   ```

5. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

- Select the shape type (Boxes or Circles) using the dropdown menu.
- Drag the blue shapes around the screen to change their positions.
- Drop the blue shapes into different locations, including on top of the red box.
- The total visible area within the red box is displayed below it.

## Implementation Details

- This project is built with Next.js, a React framework for server-side rendering and static site generation.
- The application uses TypeScript for type checking and improved developer experience.
- HTML drag and drop attributes (draggable, onDragStart, onDragEnd, onDragOver, onDrop) are used for implementing drag and drop functionality.
- The draggable shapes are implemented using the `Shape` component, which handles the drag and drop behavior.
- The total visible area of the red box is calculated using the custom hook `useDraggableShapes`. This hook tracks the positions of the draggable shapes and updates the total visible area whenever a shape is moved or dropped.
- The codebase is structured in a modular manner, with separate files for components, hooks, and types.
- The project can be customized and extended further to meet specific requirements.

Feel free to explore and interact with the draggable shapes in the application! 