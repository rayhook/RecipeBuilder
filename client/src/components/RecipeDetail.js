import React, { useState, useEffect, useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import RecipeAPI from "../API/getRecipes";
import { useParams } from "react-router-dom";
import {
  ClockIcon,
  HeartIcon,
  CheckCircleIcon,
  ArrowCircleRightIcon
} from "@heroicons/react/solid";

import notFound from "../images/image-not.jpeg";

function RecipeDetail() {
  let params = useParams();
  const { selectedRecipe, setSelectedRecipe } = useContext(RecipeContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let response = await RecipeAPI.get(`/recipes/${params.id}`);
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

  const updateTried = async () => {
    const updatedTried = await RecipeAPI.put(`/recipes/update/tried/${params.id}`);
    setSelectedRecipe(updatedTried.data.recipes[0]);
  };

  return (
    <div className="hero has-fullheight">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="section">
          <div className="columns is-centered">
            <div className="column is-4">
              <figure className="image">
                <img
                  className="is-rounded"
                  src={selectedRecipe.src}
                  alt={selectedRecipe.alt}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = notFound;
                  }}
                />
              </figure>
              <section className="has-text-centered my-5">
                <h3 className="is-size-2 has-text-weight-bold">{selectedRecipe.name}</h3>
              </section>
            </div>
          </div>

          <div className="columns is-centered">
            <div className="column is-4 is-bordered ">
              <div className="columns has-background-success-light has-text-centered is-rounded">
                <div className="column is-4 is-flex-direction-column">
                  <div className="icon is-medium">
                    <ClockIcon />
                  </div>
                  <p className="">{selectedRecipe.prepTime} minutes</p>
                </div>
                <div onClick={updateToTry} className="column is-4 is-flex-direction-column">
                  <div className="icon is-medium">
                    <HeartIcon className={selectedRecipe.toTry ? "has-text-danger" : ""} />
                  </div>
                  <div>
                    <h3>{selectedRecipe.toTry ? "Remove Favs" : "Add to Favs"}</h3>
                  </div>
                </div>
                <div onClick={updateTried} className="column is-4 is-flex-direction-column">
                  <div className="icon is-medium">
                    <CheckCircleIcon className={selectedRecipe.tried ? "has-text-success" : ""} />
                  </div>
                  <h3>{selectedRecipe.tried ? "Remove Tried" : "Add to Tried"}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="columns is-centered mt-5">
            <div className="column is-6 has-background-success-light">
              <h3 className="is-size-4 mt-2 mb-4 has-text-weight-medium">Ingredients</h3>
              <div className=" is-flex is-flex-direction-column is-flex-wrap-wrap">
                {selectedRecipe.ingredients.map((ingredient) => (
                  <div key={ingredient} className=" is-4 is-flex is-align-content-center">
                    <div className="icon is-medium mr-3">
                      <ArrowCircleRightIcon />
                    </div>
                    <p className=" is-size-5">{ingredient}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="columns is-centered mt-5">
            <div className="column is-6 has-background-success-light">
              <h3 className="is-size-4 mt-2 mb-4 has-text-weight-medium">Direction</h3>
              <div className=" is-flex is-flex-direction-column is-flex-wrap-wrap">
                {selectedRecipe.directions}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeDetail;
