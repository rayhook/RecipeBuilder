const axios = require("axios");

const RecipeAPI = axios.create({
  baseURL: "https://react-recipe-builder-app.herokuapp.com/"
});

export default RecipeAPI;
