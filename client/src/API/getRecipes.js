const axios = require("axios");

const RecipeAPI = axios.create({
  baseURL: "https://recipe-builder-app-react.herokuapp.com/"
});

export default RecipeAPI;
