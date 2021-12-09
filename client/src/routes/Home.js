import React from "react";
import RecipeList from "../components/RecipeList";
import { RecipeContextProvider } from "../context/RecipeContext";

function Home() {
  return (
    <RecipeContextProvider>
      <RecipeList />
    </RecipeContextProvider>
  );
}

export default Home;
