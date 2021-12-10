import React from "react";
import MainPage from "../components/MainPage";
import { RecipeContextProvider } from "../context/RecipeContext";

function Home() {
  return (
    <RecipeContextProvider>
      <MainPage />
    </RecipeContextProvider>
  );
}

export default Home;
