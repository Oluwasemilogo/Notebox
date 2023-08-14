import React from "react";
import search from "../assets/Search.svg";

export const Searchbox = () => {
  return (
    <div className="flex items-center gap-2 p-3 rounded-md text-md text-gray bg-white">
      <img src={search} alt="" />
      <input
        type="text"
        placeholder="Search anything"
        className="outline-none"
      />
    </div>
  );
};
