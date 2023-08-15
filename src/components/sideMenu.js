import React from "react";
import add from "../assets/add-filled.svg";
import { useColorContext } from "../ColorContext";

const SideMenu = () => {
  const {
    handleAddClick,
    showColorButtons,
    colorOptions,
    handleColorButtonClick,
  } = useColorContext();

  return (
    <div
      className="w-1/6 px-10 py-6 items-center shadow-md overflow-auto"
    >
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-medium leading-6 my-6">noteBox</h1>
        <img
          src={add}
          alt="add"
          className="w-16 h-16 mt-4 cursor-pointer"
          onClick={(e) => handleAddClick(e)}
        />
        {showColorButtons && (
          <div className="mt-8 space-y-8 flex flex-col">
            {colorOptions.map((color) => (
              <button
                key={color}
                className={`w-10 h-10 rounded-full `}
                onClick={(e) => {
                  e.stopPropagation();
                  handleColorButtonClick(color);
                }}
                style={{ backgroundColor: `#${color}` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideMenu;
