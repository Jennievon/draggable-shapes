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
- Drag the blue boxes around the screen to change their positions.
- Drop the blue boxes into different locations, including on top of the red box.
- The total visible area within the red box is displayed below it.

## Additional Notes

- This project is built with Next.js, a React framework for server-side rendering and static site generation.
- The application uses TypeScript for type checking and improved developer experience.
- HTML drag and drop attributes (draggable, ondragstart, ondragend, ondragover, ondrop) are used for implementing drag and drop functionality.
- Intersection Observer API is used to calculate the visible area of the red box based on the overlapping blue boxes.
- The project includes reusable components such as `Shape` and a custom hook `useDraggableShapes` for managing the drag and drop behaviour.
- The codebase is structured in a modular manner, with separate files for components, hooks, and types.
- The project leverages the features and benefits of Next.js, such as server-side rendering and automatic code splitting.
- The project can be customized and extended further to meet specific requirements.
