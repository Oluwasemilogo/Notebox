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
    <div className=" flex flex-col px-2   px-10 py-6 items-center min-h-screen shadow-lg overflow-y-hidden min-w-[50px]">
      <div className="flex flex-col items-center">
        <h1 className="lg:text-3xl text-lg font-medium leading-6 my-6 hidden md:block">
          noteBox
        </h1>
        <img
          src={add}
          alt="add"
          className="w-7 h-7 lg:w-14 lg:h-14 mt-4 cursor-pointer"
          onClick={(e) => handleAddClick(e)}
        />
        {showColorButtons && (
          <div className=" sm: mt-8 space-y-8 flex flex-col">
            {colorOptions.map((color) => (
              <button
                key={color}
                className={` w-5 h-5 lg:w-10 lg:h-10 rounded-full `}
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
