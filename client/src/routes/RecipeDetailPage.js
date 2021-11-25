import React from "react";
import RecipeDetail from "../components/RecipeDetail";

import { RecipeContextProvider } from "../context/RecipeContext";

function RecipeDetailPage() {
  return (
    <RecipeContextProvider>
      <>
        <RecipeDetail />
      </>
    </RecipeContextProvider>
  );
}

export default RecipeDetailPage;
