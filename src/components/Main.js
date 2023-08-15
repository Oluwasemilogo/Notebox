import React from "react";
import { Searchbox } from "./Searchbox";
import { useColorContext } from "../ColorContext";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";


export const Main = () => {
  const {
    selectedColor,
    note,
    setNote,
    handleNoteKeyPress,
    notes,
    handleDeleteNote,
    editingNoteIndex,
    setEditingNoteIndex,
    handleEditNoteChange,
    handleEditNoteKeyPress,
    searchQuery,
    setSearchQuery,
    filteredNotes,
    saveNoteWithTags,
  } = useColorContext();

  const tempColor = selectedColor;
  

  return (
    <div className="flex flex-col  p-10 Main">
      <Searchbox setSearchQuery={setSearchQuery} />
      <h1 className="text-3xl font-medium leading-6 my-12">Notes</h1>
      <div className="flex ">
        <div className={`flex-wrap flex gap-8`}>
          {selectedColor && (
            <div
              className={`w-72 h-72 mt-4 rounded-[20px] `}
              style={{ backgroundColor: `#${tempColor}` }}
            >
              <input
                type="text"
                value={note.text || ""}
                onChange={(e) =>
                  setNote({ ...note, text: e.target.value, color: tempColor })
                }
                placeholder="Add a title..."
                className="p-4 outline-none bg-inherit  text-zinc-100 text-md placeholder-zinc-100"
              />
              <input
                value={note.content || ""}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                onKeyDown={handleNoteKeyPress}
                placeholder="Add content..."
                className="p-4 outline-none bg-inherit text-zinc-100 text-md placeholder-zinc-100"
              />
              <div className="mt-2">
                <input
                  type="text"
                  value={note.tags ? note.tags.join(", ") : ""}
                  onChange={(e) =>
                    setNote({ ...note, tags: e.target.value.split(",") })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      saveNoteWithTags();
                    }
                  }}
                  placeholder="Add tags..."
                  className=" p-4 mt-16 outline-none bg-inherit text-zinc-100 text-md placeholder-zinc-100"
                />
              </div>
            </div>
          )}

          {searchQuery !== ""
            ? filteredNotes.map((note, index) => (
                <div
                  key={index}
                  className={`w-72 h-72 mt-2 rounded-lg `}
                  style={{ backgroundColor: `#${note.color}` }}
                >
                  <div
                    key={index}
                    className="px-4 py-2 text-2xl font-normal relative my-2 rounded-[20px] text-black"
                  >
                    {editingNoteIndex === index ? (
                      <textarea
                        value={note.content}
                        placeholder="Edit your note..."
                        onChange={(e) =>
                          handleEditNoteChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleEditNoteKeyPress(e, index)}
                        className="p-6 outline-none bg-inherit leading-6 text-black"
                      />
                    ) : (
                      <>
                        <div className="font-bold text-2xl mb-2 text-zinc-100 ">
                          {note.text}
                        </div>
                        <div className="text-sm font-normal mb-1 text-zinc-100">
                          {note.content}
                        </div>

                        <div className="flex gap-2 mt-32">
                          {note.tags?.map((tag, tagIndex) => (
                            <div
                              key={tagIndex}
                              className="border rounded p-1 bg-gray-100 text-sm font-normal"
                            >
                              {tag}
                            </div>
                          ))}
                        </div>

                        <img
                          src={editIcon}
                          alt="edit"
                          className="w-8 h-8 absolute top-[200px] right-[10px] cursor-pointer"
                          onClick={() => setEditingNoteIndex(index)}
                        />
                        <img
                          src={deleteIcon}
                          alt="delete"
                          className="w-8 h-8 absolute top-[20px] right-[10px] cursor-pointer"
                          onClick={() => handleDeleteNote(index)}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))
            : notes?.map((note, index) => (
                <div
                  key={index}
                  className={`w-72 h-72 mt-2 rounded-lg `}
                  style={{ backgroundColor: `#${note.color}` }}
                >
                  <div
                    key={index}
                    className="px-4 py-2 text-2xl font-normal relative my-2 rounded-[20px] text-black"
                  >
                    {editingNoteIndex === index ? (
                      <textarea
                        value={note.content}
                        placeholder="Edit your note..."
                        onChange={(e) =>
                          handleEditNoteChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleEditNoteKeyPress(e, index)}
                        className="p-6 outline-none bg-inherit leading-6 text-black"
                      />
                    ) : (
                      <>
                        <div className="font-bold text-2xl mb-2 text-zinc-100 ">
                          {note.text}
                        </div>
                        <div className="text-sm font-normal mb-1 text-zinc-100">
                          {note.content}
                        </div>

                        <div className="flex gap-2 mt-32">
                          {note.tags?.map((tag, tagIndex) => (
                            <div
                              key={tagIndex}
                              className="border rounded p-1 bg-gray-100 text-sm font-normal"
                            >
                              {tag}
                            </div>
                          ))}
                        </div>

                        <img
                          src={editIcon}
                          alt="edit"
                          className="w-8 h-8 absolute top-[200px] right-[10px] cursor-pointer"
                          onClick={() => setEditingNoteIndex(index)}
                        />
                        <img
                          src={deleteIcon}
                          alt="delete"
                          className="w-8 h-8 absolute top-[20px] right-[10px] cursor-pointer"
                          onClick={() => handleDeleteNote(index)}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};
