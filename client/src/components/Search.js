import React, { useState, useRef, useEffect } from "react";
import { BookmarkIcon } from "@heroicons/react/solid";

function Search({ searchTerm, handleChangeSearchTerm, handleFilterBookmarked }) {
  const searchRef = useRef();

  const focusSearch = () => searchRef.current.focus();

  useEffect(() => {
    focusSearch();
  }, []);

  return (
    <div
      className=" flex sm:w-full md:w-full lg:w-6/12 h-16
    my-8 text-xl py-2 px-4 shadow-sm bg-white rounded-lg"
    >
      <input
        ref={searchRef}
        className="text-gray-600 text-2xl w-9/12 h-full p-4 outline-none rounded-lg "
        type="text"
        value={searchTerm}
        onChange={handleChangeSearchTerm}
        placeholder="Search recipes or ingredients"
      />
      <div className="h-full w-1/4">
        <BookmarkIcon onClick={handleFilterBookmarked} className="h-full w-full text-gray-400" />
      </div>
    </div>
  );
}

export default Search;
