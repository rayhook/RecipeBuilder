import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import RecipeAPI from "../API/getRecipes";
import { RecipeContext } from "../context/RecipeContext";
import CreateRecipe from "./CreateRecipeModal";
import { ClockIcon, HeartIcon } from "@heroicons/react/solid";
import notFound from "../images/image-not.jpeg";
import SideBar from "./SideBar";

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

  const handleBookmarked = async (id) => {
    const updatedToTry = await RecipeAPI.put(`/recipes/update/toTryMainPage/${id}`);
    setRecipes(updatedToTry.data.recipes);
  };

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
    <div className="hero is-fullheight">
      <CreateRecipe
        handleDisplayRecipeCreate={handleDisplayRecipeCreate}
        displayRecipeCreate={displayRecipeCreate}
        setDisplayRecipeCreate={setDisplayRecipeCreate}
      />
      <div className="columns">
        <div className="column">
          <div className="section">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-one-fifth has-text-white ">
                  <div className="section">
                    <div className="container has-text-centered">
                      <h1 className="is-size-2 is-size-1-desktop has-text-weight-semibold has-text-primary-dark">
                        Recipe Builder
                      </h1>
                    </div>
                  </div>
                  <SideBar
                    bookmarkFilter={bookmarkFilter}
                    handleSetBookmarkFilter={handleSetBookmarkFilter}
                    triedFilter={triedFilter}
                    handleSetTriedFilter={handleSetTriedFilter}
                    handleDisplayRecipeCreate={handleDisplayRecipeCreate}
                  />
                </div>
                <div className="column">
                  <div className="section">
                    <div className="container">
                      <Search
                        searchTerm={searchTerm}
                        handleChangeSearchTerm={handleChangeSearchTerm}
                        bookmarkFilter={bookmarkFilter}
                        handleSetBookmarkFilter={handleSetBookmarkFilter}
                        triedFilter={triedFilter}
                        handleSetTriedFilter={handleSetTriedFilter}
                      />
                      <div className="columns is-multiline">
                        {results &&
                          results.map((recipe) => {
                            return (
                              <div className="column is-4" key={recipe.id}>
                                <div className="card">
                                  <div
                                    onClick={() => handleRecipeSelect(recipe.id)}
                                    className="card-image"
                                  >
                                    <figure className="image is-4by3">
                                      <img
                                        alt={recipe.alt}
                                        src={recipe.src}
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = notFound;
                                        }}
                                      />
                                    </figure>
                                  </div>
                                  <div className="card-content">
                                    <h4
                                      onClick={() => handleRecipeSelect(recipe.id)}
                                      className="title is-size-5"
                                    >
                                      {recipe.name}
                                    </h4>
                                  </div>
                                  <div className="card-footer">
                                    <div className="card-footer-item">
                                      <span className="icon mr-2">
                                        <ClockIcon />
                                      </span>
                                      <span className="icon-text">{recipe.prepTime} min</span>
                                    </div>
                                    <div className="card-footer-item">
                                      <button
                                        onClick={() => handleBookmarked(recipe.id)}
                                        className="button is-fullwidth is-rounded"
                                      >
                                        <div className="icon">
                                          {recipe.toTry ? (
                                            <HeartIcon className=" has-text-dark" />
                                          ) : (
                                            <HeartIcon className="has-text-grey-light" />
                                          )}
                                        </div>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
