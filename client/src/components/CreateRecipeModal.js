import React, { useEffect, useRef, useState, useContext } from "react";
import RecipeAPI from "../API/getRecipes";
import { RecipeContext } from "../context/RecipeContext";
import Input from "./Input";

function CreateRecipeModal() {
  const { setRecipes, displayRecipeCreate, handleDisplayRecipeCreate, setDisplayRecipeCreate } =
    useContext(RecipeContext);
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
    setIngredients(e.target.value);
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
    setDisplayRecipeCreate(false);
  };

  return (
    <div className={displayRecipeCreate ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="section has-background-success-light">
          <h1 className="title is-2 has-text-primary-dark has-text-centered">Create a Recipe</h1>
          <form action="submit">
            <Input
              value={name}
              labelName="name"
              inputRef={inputRef}
              handleInputChange={handleInputNameChange}
            >
              Recipe Name
            </Input>
            <Input
              value={prepTime}
              labelName="prep"
              handleInputChange={handleInputPrepTimeChange}
              plac
            >
              Preperation Time
            </Input>
            <Input
              value={ingredients}
              labelName="ingredients"
              handleInputChange={handleInputIngredientsChange}
            >
              Ingredients
            </Input>
            <div className="field">
              <label className="label" htmlFor="direction">
                Directions
              </label>
              <div className="control">
                <textarea
                  id="direction"
                  name="direction"
                  value={direction}
                  required
                  className="textarea is-success"
                  rows="3"
                  onChange={handleInputDirectionChange}
                  type="text"
                />
              </div>
            </div>
            <Input
              value={recipeURL}
              labelName="imgURL"
              handleInputChange={handleInputRecipeURLChange}
            >
              Image URL
            </Input>
            <div className="field">
              <div className="control has-text-centered mt-2">
                <button className="button is-primary" type="submit" onClick={handlePostForm}>
                  Save
                </button>
              </div>
            </div>
          </form>
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

export default CreateRecipeModal;
