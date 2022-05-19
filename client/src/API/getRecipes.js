const axios = require("axios");

const RecipeAPI = axios.create({
  baseURL: "https://recipe-builder-backend.onrender.com"
});

export default RecipeAPI;
