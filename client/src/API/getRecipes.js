const axios = require("axios");

const RecipeAPI = axios.create({
  baseURL: "http://localhost:3001"
});

export default RecipeAPI;
