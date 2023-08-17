import React from "react";
import { useColorContext } from "../ColorContext";

export const SortByTime = () => {
  const { handleSortChange } = useColorContext();
  return (
    <div className="flex flex-col">
      <select
        className="p-3 rounded-md text-md shadow-lg w-60 sm:w-64  bg-white outline-none mt-4"
        onChange={(e) => handleSortChange(e)}
        defaultValue={"Sort by time"}
      >
        <option hidden value={"Sort by time"}>
          Sort by time
        </option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
};
