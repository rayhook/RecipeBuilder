import React, { useState, createContext } from "react";

export const RecipeContext = createContext();

export const RecipeContextProvider = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [bookmarkFilter, setBookmarkFilter] = useState(false);
  const [triedFilter, setTriedFilter] = useState(false);
  const [displayRecipeCreate, setDisplayRecipeCreate] = useState(false);

  const handleChangeSearchTerm = (e) => setSearchTerm(e.target.value);
  const handleSetTriedFilter = () => setTriedFilter((prevState) => !prevState);
  const handleSetBookmarkFilter = () => setBookmarkFilter((prevState) => !prevState);
  const handleDisplayRecipeCreate = () => {
    setDisplayRecipeCreate((prevState) => !prevState);
  };
  const filterMethods = [
    {
      filter: "NameIngredient",
      active: true,
      filterMethod: (recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients
          .map((ingredient) => ingredient.includes(searchTerm.toLowerCase()))
          .includes(true)
    },
    {
      filter: "bookmarked",
      active: bookmarkFilter,
      filterMethod: (recipe) => recipe.toTry === true
    },
    {
      filter: "tried",
      active: triedFilter,
      filterMethod: (recipe) => recipe.tried === true
    }
  ];

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        selectedRecipe,
        setSelectedRecipe,
        searchTerm,
        handleChangeSearchTerm,
        filterMethods,
        triedFilter,
        handleSetTriedFilter,
        bookmarkFilter,
        handleSetBookmarkFilter,
        displayRecipeCreate,
        handleDisplayRecipeCreate
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};
