import React, { createContext, useContext, useState } from "react";

const ColorContext = createContext();

export const useColorContext = () => {
  return useContext(ColorContext);
};

const cache = JSON.parse(localStorage.getItem("notes")) || [];
export const ColorProvider = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [showColorButtons, setShowColorButtons] = useState(false);
  const [note, setNote] = useState({});
    const [notes, setNotes] = useState([...cache]);
    const [editingNoteIndex, setEditingNoteIndex] = useState(null);

  console.log(cache, notes);

  const handleAddClick = (e) => {
    e.stopPropagation();
    setShowColorButtons(true);
  };

  const handleColorButtonClick = (color) => {
    setSelectedColor(color);
    };

    const handleDeleteNote = (index) => {
      const updatedNotes = notes.filter((_, i) => i !== index);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    };

     const handleEditNoteChange = (index, newText) => {
       const updatedNotes = [...notes];
       updatedNotes[index].text = newText;
       setNotes(updatedNotes);
     };

     const handleEditNoteKeyPress = (event, index) => {
       if (event.key === "Enter" && !event.shiftKey) {
         event.preventDefault();
         setEditingNoteIndex(null); // Stop editing mode
         localStorage.setItem("notes", JSON.stringify(notes));
       }
     };

  const handleNoteChange = (event) => {
    setNote.text(event.target.value);
  };

  const handleNoteKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (note.text.trim() !== "") {
        localStorage.setItem("notes", JSON.stringify([note, ...notes]));
        setNotes([note, ...notes]);
      }
      setSelectedColor(null);
    }
  };

  const contextValues = {
    selectedColor,
    setSelectedColor,
    showColorButtons,
    setShowColorButtons,
    handleAddClick,
    handleColorButtonClick,
    note,
    setNote,
    notes,
    setNotes,
    handleDeleteNote,
    handleNoteChange,
    editingNoteIndex,
    setEditingNoteIndex,
    handleEditNoteChange,
    handleEditNoteKeyPress,

    handleNoteKeyPress,
    colorOptions: ["c6d947", "f3542a", "f5972c", "7049f0", "0aa4f6"],
  };

  return (
    <ColorContext.Provider value={contextValues}>
      {children}
    </ColorContext.Provider>
  );
};
