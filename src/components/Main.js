import React from "react";
import { Searchbox } from "./Searchbox";
import { useColorContext } from "../ColorContext";

export const Main = () => {
  const { selectedColor } = useColorContext();

  return (
    <div className="flex flex-col h-screen p-10 Main">
      <Searchbox />
      <h1 className="text-3xl font-medium leading-6 my-12">Notes</h1>
      {selectedColor && (
        <div
          className={`w-64 h-64 mt-4 rounded-lg bg-${selectedColor}`}
          style={{ backgroundColor: `#${selectedColor}` }}
        >
          <textarea
            placeholder="Add a note..."
            className=" p-4 outline-none bg-inherit text-xl font-medium leading-6 my-12 text-white"
          />
        </div>
      )}
    </div>
  );
};
