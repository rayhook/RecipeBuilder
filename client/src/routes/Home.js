import React from "react";
import RecipeList from "../components/RecipeList";
import { RecipeContextProvider } from "../context/RecipeContext";

function Home() {
  return (
    <RecipeContextProvider>
      <div className="m-0 p-0 min-h-screen font-playfair bg-gray-200">
        <RecipeList />
      </div>
    </RecipeContextProvider>
  );
}

export default Home;
