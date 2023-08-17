import React, { useEffect } from "react";
import { Searchbox } from "./Searchbox";
import { SortByTime } from "./sortByTime";
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
    showDeleteDialog,
    showDeleteConfirmation,
    deleteNoteConfirmed,
    deleteNoteCancelled,
    editingNoteIndex,
    setEditingNoteIndex,
    handleEditNoteChange,
    handleEditNoteKeyPress,
    searchQuery,
    setSearchQuery,
    filteredNotes,
    saveNoteWithTags,
    handleSortChange,
  } = useColorContext();

  const tempColor = selectedColor;

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  return (
    <div className="flex flex-col p-5 sm:p-10 w-full">
      <h1 className="text-3xl text-center font-medium leading-6 my-12 mb-12 md:hidden block">
        noteBox
      </h1>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 ">
        <Searchbox setSearchQuery={setSearchQuery} />
        <div className="mt-6 sm:mt-0">
          <SortByTime handleSortChange={handleSortChange} />
        </div>
      </div>
      
      <div className="flex my-16">
        <div className={` ml-8 md:ml-16 flex-wrap flex gap-10`}>
          {selectedColor && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={`w-60 sm:w-72 h-72 mt-4 rounded-[20px] `}
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
                  className={`w-60 sm:w-72 h-72 mt-2 rounded-lg `}
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
                        <div className="font-bold text-3xl mb-2 text-zinc-100 ">
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
                        {showDeleteDialog && (
                          <div className="fixed inset-0 flex items-center justify-center bg-zinc-300 bg-opacity-50">
                            <div className="bg-white p-6 rounded-md shadow-md">
                              <p className="text-md font-normal">
                                Are you sure you want to delete this note?
                              </p>
                              <div className="flex justify-end mt-4">
                                <button
                                  className="px-4 mr-4 py-2 bg-zinc-100 text-zinc-500 rounded-md text-sm font-light"
                                  onClick={deleteNoteCancelled}
                                >
                                  Cancel
                                </button>
                                <button
                                  className=" px-4 py-2 bg-red-500 text-white text-sm font-light rounded-md"
                                  onClick={deleteNoteConfirmed}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                        <img
                          src={deleteIcon}
                          alt="delete"
                          className="w-8 h-8 absolute top-[20px] right-[10px] cursor-pointer"
                          onClick={() => showDeleteConfirmation(index)}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))
            : notes?.map((note, index) => (
                <div
                  key={index}
                  className={`w-60 sm:w-72 h-72 mt-2 rounded-lg `}
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
                        <div className="font-bold text-xl mb-2 text-zinc-100 ">
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
                        {showDeleteDialog && (
                          <div className="fixed inset-0 flex items-center justify-center bg-zinc-200 bg-opacity-50">
                            <div className="bg-white p-6 rounded-md shadow-md">
                              <p className="text-lg font-medium">
                                Are you sure you want to delete this note?
                              </p>
                              <div className="flex justify-end mt-4">
                                <button
                                  className="px-4 py-2 mr-4 bg-gray-300 text-gray-700 rounded-md"
                                  onClick={deleteNoteCancelled}
                                >
                                  Cancel
                                </button>
                                <button
                                  className=" px-4 py-2 bg-red-500 text-white rounded-md"
                                  onClick={deleteNoteConfirmed}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                        <img
                          src={deleteIcon}
                          alt="delete"
                          className="w-8 h-8 absolute top-[20px] right-[10px] cursor-pointer"
                          onClick={() => showDeleteConfirmation(index)}
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
