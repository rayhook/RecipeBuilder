const express = require("express");
const cors = require("cors");
const { response } = require("express");
const { json } = express;
const app = express();

const {
  recipeList,
  updateToTry,
  findRecipe,
  addRecipe,
  updateTried,
  updateToTryHomePage
} = require("./recipes");

// middleware

app.use(cors());
app.use(json());

app.get("/", (req, res) => res.send("Recipe API running"));

// Get all recipes

app.get("/recipes", (req, res) => {
  try {
    res.json({
      recipes: recipeList
    });
  } catch (err) {
    console.error(err);
  }
});

// Get a recipe

app.get("/recipes/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let foundRecipe = await findRecipe(id);
    res.json({
      recipe: foundRecipe
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Create a recipe

app.post("/recipe/", async (req, res) => {
  try {
    const { name, prepTime, ingredients, direction, recipeURL } = req.body;
    await addRecipe(name, prepTime, ingredients, direction, recipeURL);
    res.json({
      recipes: recipeList
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Add/Remove Bookmark recipe

app.put("/recipes/update/toTry/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedToTry = await updateToTry(id);
    res.json({
      recipes: updatedToTry
    });
  } catch (err) {
    console.error(err);
  }
});

// Add/Remove Bookmark from Homepage

app.put("/recipes/update/toTryMainPage/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedToTry = await updateToTryHomePage(id);
    res.json({
      recipes: updatedToTry
    });
  } catch (err) {
    console.error(err);
  }
});

app.put("/recipes/update/tried/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTried = await updateTried(id);
    res.json({
      recipes: updatedTried
    });
  } catch (err) {
    console.error(err);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
