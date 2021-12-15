import React, { useRef, useEffect, useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";

function Search() {
  const { searchTerm, handleChangeSearchTerm } = useContext(RecipeContext);
  const searchRef = useRef();
  const focusSearch = () => searchRef.current.focus();

  useEffect(() => {
    focusSearch();
  }, []);

  return (
    <div className="section">
      <div className="columns is-centered">
        <div className="column is-half">
          <input
            ref={searchRef}
            className="input is-primary is-size-5 is-rounded"
            type="text"
            value={searchTerm}
            onChange={handleChangeSearchTerm}
            placeholder="Search recipes or ingredients"
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
