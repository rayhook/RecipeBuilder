import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeAPI from "../API/getRecipes";
import { RecipeContext } from "../context/RecipeContext";
import CreateRecipe from "./CreateRecipe";
import Search from "./Search";
import { ClockIcon } from "@heroicons/react/solid";

export default function RecipeList() {
  const { recipes, setRecipes } = useContext(RecipeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarkFilter, setBookmarkFilter] = useState(false);
  const [triedFilter, setTriedFilter] = useState(false);
  const [displayRecipeCreate, setDisplayRecipeCreate] = useState(false);
  let navigate = useNavigate();

  const handleChangeSearchTerm = (e) => setSearchTerm(e.target.value);
  const handleSetBookmarkFilter = () => setBookmarkFilter((prevState) => !prevState);
  const handleSetTriedFilter = () => setTriedFilter((prevState) => !prevState);

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

  const activeFilterMethods = filterMethods.filter((method) => method.active);

  const results = recipes.filter((recipe) => {
    for (let i = 0; i < activeFilterMethods.length; i++) {
      if (!activeFilterMethods[i].filterMethod(recipe)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto py-16  px-4 sm:py-24 sm:px-6 lg:max-w-7xl">
      <div className="flex justify-center">
        <Search
          searchTerm={searchTerm}
          handleChangeSearchTerm={handleChangeSearchTerm}
          bookmarkFilter={bookmarkFilter}
          handleSetBookmarkFilter={handleSetBookmarkFilter}
          triedFilter={triedFilter}
          handleSetTriedFilter={handleSetTriedFilter}
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
        <CreateRecipe
          handleDisplayRecipeCreate={handleDisplayRecipeCreate}
          setDisplayRecipeCreate={setDisplayRecipeCreate}
        />
      )}

      <div className="grid grid-cols-1 gap-y-10 max-h-screen overflow-y-auto mt-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6 ">
        {/* Recipe Card */}
        {results &&
          results.map((recipe) => {
            return (
              <div
                key={recipe.id}
                className="relative bg-gray-200 group group-hover:opacity-75 group-hover:shadow-xl rounded-lg"
              >
                <div className="flex items-center w-14 h-14 absolute z-40 top-0 left-0 text-gray-100 font-extrabold py-1 text-xl">
                  <ClockIcon area-hidden="true" className="" />
                  <div>{recipe.prepTime}</div>
                </div>

                <div
                  onClick={() => handleRecipeSelect(recipe.id)}
                  className="aspect-w-1 aspect-h-1 bg-blue-500"
                >
                  <img
                    alt={recipe.alt}
                    src={recipe.src}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
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
