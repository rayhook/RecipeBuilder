import React, { useState, createContext } from "react";

export const RecipeContext = createContext();

export const RecipeContextProvider = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes, selectedRecipe, setSelectedRecipe }}>
      {props.children}
    </RecipeContext.Provider>
  );
};
