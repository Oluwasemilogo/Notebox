import React, { createContext, useContext, useState } from "react";

const ColorContext = createContext();

export const useColorContext = () => {
  return useContext(ColorContext);
};

const cache = JSON.parse(localStorage.getItem("notes")) || [];
export const ColorProvider = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [showColorButtons, setShowColorButtons] = useState(false);
  const [note, setNote] = useState({ text: "", content: "", tags: [] });
  const [notes, setNotes] = useState([...cache]);
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


    const filteredNotes = notes?.filter((note) =>
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );


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
    updatedNotes[index].content = newText;
    setNotes(updatedNotes);
  };

  const handleEditNoteKeyPress = (event, index) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      setEditingNoteIndex(null);
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  };
 const saveNoteWithTags = () => {
   if (note.text.trim() !== "") {
     const filteredTags = note.tags
       .map((tag) => tag.trim()) 
       .filter((tag) => tag !== "");

     const noteWithTags = {
       ...note,
       tags: filteredTags,
     };

     localStorage.setItem("notes", JSON.stringify([noteWithTags, ...notes]));
     setNotes([noteWithTags, ...notes]);
     setSelectedColor(null);
     setNote({ text: "", content: "", tags: [] });
   }
 };



 const handleNoteKeyPress = (event) => {
   if (event.key === "Enter" && !event.shiftKey) {
     event.preventDefault();
      saveNoteWithTags();
     if (note.text.trim() !== "") {
       localStorage.setItem(
         "notes",
         JSON.stringify([{ ...note, tags: note.tags }, ...notes])
       );
       setNotes([{ ...note, tags: note.tags }, ...notes]);
     }
     setSelectedColor(null);
     setNote({ text: "", content: "", tags: [] });
   }
 };

  const contextValues = {
    selectedColor,
    setSelectedColor,
    showColorButtons,
    setShowColorButtons,
    searchQuery,
    setSearchQuery,
    filteredNotes,
    note,
    setNote,
    notes,
    setNotes,
    handleAddClick,
    handleColorButtonClick,
    handleDeleteNote,
    handleEditNoteChange,
    handleEditNoteKeyPress,
    handleNoteKeyPress,
    editingNoteIndex,
    setEditingNoteIndex,
    saveNoteWithTags,
    colorOptions: ["c6d947", "f3542a", "f5972c", "7049f0", "0aa4f6"],
  };

  return (
    <ColorContext.Provider value={contextValues}>
      {children}
    </ColorContext.Provider>
  );
};
