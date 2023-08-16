import React from 'react';
import { useColorContext } from "../ColorContext";

export const SortByTime = () => {
    const { handleSortChange } = useColorContext();
  return (
    <div className="flex flex-col">
      <label className="text-md font-600 text-center">
        Sort by Time Created
      </label>
      <select
        className="p-3 rounded-md text-md shadow-md w-64  bg-white outline-none mt-4"
        onChange={(e) => handleSortChange(e)}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}
