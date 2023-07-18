import { Inter } from "next/font/google";
import React from "react";
import DraggableBoxes from "../components/DraggableBoxes";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  return (
    <div>
      <h1>Draggable Boxes</h1>
      <DraggableBoxes />
    </div>
  );
};

export default Home;
