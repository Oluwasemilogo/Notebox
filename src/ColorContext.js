import React, { createContext, useContext, useState } from "react";

const ColorContext = createContext();

export const useColorContext = () => {
  return useContext(ColorContext);
};

export const ColorProvider = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [showColorButtons, setShowColorButtons] = useState(false);

  const handleAddClick = (e) => {
    e.stopPropagation();
    setShowColorButtons(true);
  };

  const handleColorButtonClick = (color) => {
    setSelectedColor(color);
  };

  const contextValues = {
    selectedColor,
    setSelectedColor,
    showColorButtons,
    setShowColorButtons,
    handleAddClick,
    handleColorButtonClick,
    colorOptions: ["c6d947", "f3542a", "f5972c", "7049f0", "0aa4f6"],
  };

  return (
    <ColorContext.Provider value={contextValues}>
      {children}
    </ColorContext.Provider>
  );
};
