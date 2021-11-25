import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./routes/Home";
import RecipeDetailPage from "./routes/RecipeDetailPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
