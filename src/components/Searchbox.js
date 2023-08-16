import React from "react";
import search from "../assets/Search.svg";
import { useColorContext } from "../ColorContext";

export const Searchbox = () => {
  const { setSearchQuery } = useColorContext(); 
  return (
    <div className="flex items-center gap-2 p-3 rounded-md text-md shadow-md w-60  sm:w-64 text-gray bg-white">
      <img src={search} alt="" />
      <input
        type="text"
        placeholder="Search by tags"
        className="outline-none"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};
