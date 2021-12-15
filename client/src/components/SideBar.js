import React, { useContext } from "react";
import { HeartIcon, PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/solid";
import { RecipeContext } from "../context/RecipeContext";

function SideBar() {
  const {
    bookmarkFilter,
    handleSetBookmarkFilter,
    triedFilter,
    handleSetTriedFilter,
    handleDisplayRecipeCreate
  } = useContext(RecipeContext);
  return (
    <div className="section">
      <div className="buttons are-medium">
        <button
          className={
            bookmarkFilter === false
              ? "button is-success is-outlined is-rounded is-fullwidth my-1"
              : "button is-success is-hovered is-outlined is-rounded is-fullwidth my-1"
          }
          onClick={handleSetBookmarkFilter}
        >
          <span className="icon">
            <HeartIcon />
          </span>
          <span className="icon-text">Saved</span>
        </button>
        <button
          className={
            triedFilter
              ? "button is-success is-hovered is-outlined is-rounded is-fullwidth my-1"
              : "button is-success is-outlined is-rounded is-fullwidth my-1"
          }
          onClick={handleSetTriedFilter}
        >
          <span className="icon">
            <CheckCircleIcon />
          </span>
          <span className="icon-text is-size-5">Tried</span>
        </button>
        <button
          className="button is-success is-outlined is-rounded is-fullwidth my-1"
          onClick={handleDisplayRecipeCreate}
        >
          <span className="icon">
            <PlusCircleIcon />
          </span>
          <span className="icon-text">Create</span>
        </button>
      </div>
    </div>
  );
}

export default SideBar;
