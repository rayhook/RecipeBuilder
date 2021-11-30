import React, { useEffect, useRef, useState, useContext } from "react";
import { XIcon } from "@heroicons/react/solid";
import RecipeAPI from "../API/getRecipes";
import { RecipeContext } from "../context/RecipeContext";

function CreateRecipe({ handleDisplayRecipeCreate, setDisplayRecipeCreate }) {
  const { recipes, setRecipes } = useContext(RecipeContext);
  const inputRef = useRef();
  const focusInput = () => inputRef.current.focus();

  useEffect(() => {
    focusInput();
  }, []);

  const [name, setName] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [direction, setDirection] = useState("");
  const [recipeURL, setRecipeURL] = useState("");

  const handleInputNameChange = (e) => {
    setName(e.target.value);
  };

  const handleInputPrepTimeChange = (e) => {
    setPrepTime(e.target.value);
  };

  const handleInputIngredientsChange = (e) => {
    const splitIngredients = e.target.value.split(" ");
    splitIngredients.map((ingredient) => setIngredients(ingredients.concat(ingredient)));
  };

  const handleInputDirectionChange = (e) => {
    setDirection(e.target.value);
  };

  const handleInputRecipeURLChange = (e) => {
    setRecipeURL(e.target.value);
  };

  const newRecipe = {
    name,
    prepTime,
    ingredients,
    direction,
    recipeURL
  };
  const handlePostForm = async (e) => {
    e.preventDefault();
    const response = await RecipeAPI.post("/recipe", newRecipe);
    setRecipes(response.data.recipes);
    // notify recipe added logic
    setDisplayRecipeCreate(false);
  };

  return (
    <div className="fixed h-screen inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="w-3/4 h-3/4 bg-gray-200 py-6 px-4 rounded-md">
        <div className="flex justify-end">
          <XIcon className="relative w-10 h-10" onClick={handleDisplayRecipeCreate} />
        </div>
        <div className=" w-full flex justify-center">
          <h3 className="text-4xl">Create a Recipe</h3>
        </div>

        <div className="w-ful flex flex-col mt-2 p-3">
          <form className="space-y-6" action="">
            <Input
              value={name}
              labelName="name"
              inputRef={inputRef}
              handleInputChange={handleInputNameChange}
            >
              Name
            </Input>
            <Input value={prepTime} labelName="prep" handleInputChange={handleInputPrepTimeChange}>
              Prepare Time
            </Input>
            <Input
              value={ingredients}
              labelName="ingredient"
              handleInputChange={handleInputIngredientsChange}
            >
              Ingredients
            </Input>
            <Input
              value={direction}
              labelName="direction"
              handleInputChange={handleInputDirectionChange}
            >
              Direction
            </Input>
            <Input
              value={recipeURL}
              labelName="imgURL"
              handleInputChange={handleInputRecipeURLChange}
            >
              Image URL
            </Input>
            <div className="flex justify-center">
              <button
                className="bg-blue-500 text-white text-xl font-semibold w-24 rounded-md p-3 shadow-sm"
                type="submit"
                onClick={handlePostForm}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateRecipe;

const Input = ({ labelName, children, inputRef, value, handleInputChange }) => {
  return (
    <div>
      <div className="mt-3">
        <label className="px-2 font-medium block text-xl border-purple-300" htmlFor={labelName}>
          {children}
        </label>
      </div>
      <div className="w-full">
        <input
          id={labelName}
          name={labelName}
          value={value}
          ref={inputRef}
          required
          className="w-full px-2 py-1 text-2xl rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500
      "
          onChange={handleInputChange}
          type="text"
        />
      </div>
    </div>
  );
};
