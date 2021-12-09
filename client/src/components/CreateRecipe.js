import React, { useEffect, useRef, useState, useContext } from "react";
import { XIcon } from "@heroicons/react/solid";
import RecipeAPI from "../API/getRecipes";
import { RecipeContext } from "../context/RecipeContext";

function CreateRecipe({ handleDisplayRecipeCreate, setDisplayRecipeCreate, displayRecipeCreate }) {
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
    <div className={displayRecipeCreate ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="">
          <div className="">
            <h3 className="">Create a Recipe</h3>
          </div>

          <div className="">
            <form className="space-y-6" action="">
              <Input
                value={name}
                labelName="name"
                inputRef={inputRef}
                handleInputChange={handleInputNameChange}
              >
                Name
              </Input>
              <Input
                value={prepTime}
                labelName="prep"
                handleInputChange={handleInputPrepTimeChange}
              >
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
      <button
        onClick={handleDisplayRecipeCreate}
        className="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  );
}

export default CreateRecipe;

const Input = ({ labelName, children, inputRef, value, handleInputChange }) => {
  return (
    <div>
      <div className="">
        <label className="" htmlFor={labelName}>
          {children}
        </label>
      </div>
      <div className="">
        <input
          id={labelName}
          name={labelName}
          value={value}
          ref={inputRef}
          required
          className="input"
          onChange={handleInputChange}
          type="text"
        />
      </div>
    </div>
  );
};
