import React, { createContext, useContext, useState } from "react";
// import { format } from "date-fns";

const ColorContext = createContext();

export const useColorContext = () => {
  return useContext(ColorContext);
};

const cache = JSON.parse(localStorage.getItem("notes")) || [];
// cache.forEach((note) => {
//   note.timestamp = new Date(note.timestamp);
// });
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
        timestamp: new Date(),
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
        setNote((note) => ({ ...note, timestamp: new Date() }));
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

  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    let sortedNotes = [...notes];

    if (selectedValue === "newest") {
      sortedNotes = sortedNotes.sort((a, b) => {
        console.log(a.timestamp, b.timestamp);
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      setNotes(sortedNotes);
    } else {
      sortedNotes = sortedNotes.sort((a, b) => {
        console.log(a.timestamp, b.timestamp);
        return new Date(a.timestamp) - new Date(b.timestamp);
      });
      setNotes(sortedNotes);
    }
    console.log("context", notes);
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
    handleSortChange,
    colorOptions: ["c6d947", "f3542a", "f5972c", "7049f0", "0aa4f6"],
  };

  return (
    <ColorContext.Provider value={contextValues}>
      {children}
    </ColorContext.Provider>
  );
};
