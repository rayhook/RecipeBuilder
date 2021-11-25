import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeAPI from "../API/getRecipes";
import { RecipeContext } from "../context/RecipeContext";
import CreateRecipe from "./CreateRecipe";
import Search from "./Search";

export default function RecipeList() {
  const { recipes, setRecipes } = useContext(RecipeContext);
  const [searchToTry, setsearchToTry] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayRecipeCreate, setDisplayRecipeCreate] = useState(false);
  const handleChangeSearchTerm = (e) => setSearchTerm(e.target.value);

  let navigate = useNavigate();
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await RecipeAPI.get("/recipes");
        setRecipes(response.data.recipes);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchRecipes();
  }, [setRecipes]);

  const handleRecipeSelect = (id) => {
    navigate(`/recipes/${id}`);
  };

  const handleSearchToTry = () => {
    console.log(searchToTry);
  };

  const handleDisplayRecipeCreate = () => {
    setDisplayRecipeCreate((prevState) => !prevState);
  };

  const searchedResuslts = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients
        .map((ingredient) => ingredient.includes(searchTerm.toLowerCase()))
        .includes(true)
  );
  return (
    <div className="max-w-2xl mx-auto py-16  px-4 sm:py-24 sm:px-6 lg:max-w-7xl">
      <div className="flex justify-center">
        <Search
          searchTerm={searchTerm}
          handleChangeSearchTerm={handleChangeSearchTerm}
          handleSearchToTry={handleSearchToTry}
        />
      </div>
      <div className="w-full flex justify-center mt-2">
        <button
          className="bg-gray-500 rounded-lg text-white p-4"
          onClick={handleDisplayRecipeCreate}
        >
          Add a Recipe
        </button>
      </div>

      {displayRecipeCreate && (
        <CreateRecipe handleDisplayRecipeCreate={handleDisplayRecipeCreate} />
      )}

      <div className="grid grid-cols-1 gap-y-10 max-h-screen overflow-y-auto mt-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6 ">
        {/* Recipe Card */}
        {searchedResuslts &&
          searchedResuslts.map((recipe) => {
            return (
              <div
                key={recipe.id}
                className="bg-gray-100 p-1 group group-hover:opacity-75 group-hover:shadow-xl rounded-lg"
              >
                <div onClick={() => handleRecipeSelect(recipe.id)}>
                  <div className="w-full aspect-w-1 aspect-h-1 bg-gray-500 overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      alt={recipe.alt}
                      src={recipe.src}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                </div>
                <div className="flex-col">
                  <h4
                    className="px-1 ml-2 my-4
              text-2xl pt-1 text-gray-700"
                  >
                    {recipe.name}
                  </h4>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
