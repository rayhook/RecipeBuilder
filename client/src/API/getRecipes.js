const axios = require("axios");

const RecipeAPI = axios.create({
  baseURL: "https://recipe-builder-rayhook.herokuapp.com/"
});

export default RecipeAPI;
