import React, { useState, useRef, useEffect } from "react";
import { BookmarkIcon, CheckCircleIcon } from "@heroicons/react/solid";

function Search({
  searchTerm,
  handleChangeSearchTerm,
  bookmarkFilter,
  handleSetBookmarkFilter,
  triedFilter,
  handleSetTriedFilter
}) {
  const searchRef = useRef();
  const focusSearch = () => searchRef.current.focus();

  useEffect(() => {
    focusSearch();
  }, []);

  return (
    <div className="flex flex-col items-center my-8 lg:w-6/12">
      <div
        className="flex sm:w-full md:w-full lg:w-full h-16
    my-5 text-xl py-2 px-4 shadow-sm bg-white rounded-lg"
      >
        <input
          ref={searchRef}
          className="text-gray-600 text-2xl w-9/12 h-full p-4 outline-none rounded-lg "
          type="text"
          value={searchTerm}
          onChange={handleChangeSearchTerm}
          placeholder="Search recipes or ingredients"
        />
      </div>
      <div onClick={handleSetBookmarkFilter} className="flex h-full text-xl space-x-6">
        <div className="flex items-center">
          <BookmarkIcon
            className={bookmarkFilter ? "ml-2 h-6 w-6 text-gray-900" : "ml-2 h-6 w-6 text-gray-500"}
          />
          <div className={bookmarkFilter ? "text-gray-900" : "text-gray-500"}>Bookmarked</div>
        </div>

        <div onClick={handleSetTriedFilter} className="flex items-center mx-3">
          <CheckCircleIcon
            className={triedFilter ? "ml-2 h-6 w-6 text-gray-900" : "ml-2 h-6 w-6 text-gray-500"}
          />
          <div className={triedFilter ? "text-gray-900" : "text-gray-500"}>Tried</div>
        </div>
      </div>
    </div>
  );
}

export default Search;
