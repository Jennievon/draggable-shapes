import { Inter } from "next/font/google";
import React from "react";
import DraggableShapes from "../components/DraggableShapes";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <div className="container">
      <h1>Draggable Shapes</h1>
      <DraggableShapes />
    </div>
  );
};

export default Home;
