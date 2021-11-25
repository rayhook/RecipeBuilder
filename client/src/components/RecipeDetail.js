import React, { useState, useEffect, useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import RecipeAPI from "../API/getRecipes";
import { useParams } from "react-router-dom";
import {
  BookmarkIcon,
  ArrowCircleRightIcon,
  ClockIcon,
  ShoppingCartIcon
} from "@heroicons/react/solid";

function RecipeDetail() {
  let params = useParams();
  const { selectedRecipe, setSelectedRecipe } = useContext(RecipeContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let response = await RecipeAPI.get(`/recipes/${params.id}`);
        // got selected recipe object from backend and saved in state
        setSelectedRecipe(response.data.recipe[0]);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipes();
  }, [selectedRecipe, setSelectedRecipe, params.id]);

  const updateToTry = async () => {
    const updatedToTry = await RecipeAPI.put(`/recipes/update/toTry/${params.id}`);
    setSelectedRecipe(updatedToTry.data.recipes[0]);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-400 p-4">
      {loading ? (
        <p className="text-lg">Loading...</p>
      ) : (
        <div className="w-7/12 h-5/6 bg-gray-200 p-5 shadow-lg rounded-lg">
          <div className="w-full h-full grid grid-rows-6 grid-cols-2 gap-2">
            <div className="row-span-1 col-span-2 p-1 m-2 flex justify-center items-center text-6xl text-gray-800">
              {selectedRecipe.name}
            </div>
            <div className="row-span-5 col-span-2 p-1 m-2">
              <div className="grid grid-cols-2 gap-2 h-full">
                <div className="flex flex-col">
                  <div className="flex items-center py-2">
                    <BookmarkIcon
                      onClick={updateToTry}
                      className={
                        selectedRecipe.toTry === false
                          ? "h-10 w-10 text-gray-500"
                          : "h-10 w-10 text-green-500"
                      }
                    />
                  </div>

                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    <p className="font-extrabold py-3 mr-2">Prep time</p>
                    <p>{selectedRecipe.prepTime} minutes</p>
                  </div>

                  <div className="flex items-center">
                    <ShoppingCartIcon className="w-5 h-5 mr-2" />
                    <ul className="font-extrabold py-3">Ingredients</ul>
                  </div>

                  {selectedRecipe.ingredients.map((ingredient) => (
                    <div className="flex flex-start items-center">
                      <ArrowCircleRightIcon className="h-4 w-4" />
                      <p className="py-1 px-3">{ingredient}</p>
                    </div>
                  ))}
                  <p className="font-extrabold py-3">Directions:</p>
                  <div className="w-full h-full">{selectedRecipe.directions}</div>
                </div>
                <div className="bg-blue-300 flex">
                  <div className="w-full overflow-hidden aspect-w-1 aspect-h-1">
                    <img
                      className="w-full h-full object-center object-cover "
                      src={selectedRecipe.src}
                      alt={selectedRecipe.alt}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row-span-1 col-span-2 p-1 my-3">
              <div className="grid grid-cols-2">
                <button
                  className={
                    selectedRecipe.toTry === false
                      ? "p-2 mx-2 bg-green-300 rounded-lg"
                      : "p-2 mx-2 bg-red-200 rounded-lg"
                  }
                  onClick={updateToTry}
                >
                  {selectedRecipe.toTry === false ? "Add to Fav" : "Remove from Fav"}
                </button>
                <button className="p-2 mx-2 bg-yellow-500 rounded-lg">Tried Recipe</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeDetail;
