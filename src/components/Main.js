import React from "react";
import { Searchbox } from "./Searchbox";
import { useColorContext } from "../ColorContext";
import editIcon from "../assets/edit-circle.svg";
import deleteIcon from "../assets/delete-circle.svg";

export const Main = () => {
  const {
    selectedColor,
    noteText,
    setNote,
    handleNoteKeyPress,
    notes,
    handleDeleteNote,
    editingNoteIndex,
    setEditingNoteIndex,
    handleEditNoteChange,
    handleEditNoteKeyPress,
  } = useColorContext();

  const tempColor = selectedColor;
  // const handleDeleteNote = (index) => {
  //   const updatedNotes = notes.filter((_, i) => i !== index);
  //   localStorage.setItem("notes", JSON.stringify(updatedNotes));
  //   setNotes(updatedNotes);

  

  return (
    <div className="flex flex-col h-screen p-10 Main">
      <Searchbox />
      <h1 className="text-3xl font-medium leading-6 my-12">Notes</h1>
      <div className="flex ">
        {
          <div className={`flex-wrap flex gap-8`}>
            {selectedColor && (
              <div
                className={`w-72 h-72 mt-4 rounded-[20px] `}
                style={{ backgroundColor: `#${tempColor}` }}
              >
                
                <textarea
                  value={noteText}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    setNote({ text: e.target.value, color: selectedColor })
                  }
                  onKeyDown={handleNoteKeyPress}
                  placeholder="Add a note..."
                  className="p-6 outline-none  bg-inherit leading-6 text-black"
                />
              </div>
            )}

            {notes?.length > 0 &&
              notes?.map((note, index) => (
                <div
                  key={index}
                  className={`w-72 h-72 mt-4 rounded-lg `}
                  style={{ backgroundColor: `#${note.color}` }}
                >
                  <div
                    key={index}
                    className="p-4 text-2xl font-normal relative my-2 rounded-[20px] text-black"
                  >
                    {editingNoteIndex === index ? (
                      <textarea
                        
                        value={note.text}
                        placeholder="Edit your note..."
                        onChange={(e) =>
                          handleEditNoteChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleEditNoteKeyPress(e, index)}
                        className="p-6 outline-none bg-inherit leading-6 text-black"
                      />
                    ) : (
                      <>
                        {note.text}
                        <img
                          src={editIcon}
                          alt="edit"
                          className="w-8 h-8 absolute top-[230px] right-0 cursor-pointer"
                          onClick={() => setEditingNoteIndex(index)}
                        />
                        <img
                          src={deleteIcon}
                          alt="delete"
                          className="w-8 h-8 absolute top-[20px] right-0 cursor-pointer"
                          onClick={() => handleDeleteNote(index)}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        }
      </div>
    </div>
  );
};
