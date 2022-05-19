const { v4: uuidv4 } = require("uuid");

let recipeList = [
  {
    id: "1",
    name: "Chicken parmisan with garlic",
    src: "https://static.toiimg.com/thumb/54673639.cms?imgsize=497063&width=800&height=800",
    alt: "Chicken based with tomato and basil",
    prepTime: 30,
    ingredients: ["chicken", "cabbage", "onion", "garlic", "parsley"],
    toTry: true,
    tried: false,
    directions:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit vel autem maxime, explicabo, quia quasi iure quos dicta adipisci soluta ea esse quidem! Quam quis eum illum incidunt, voluptatum deserunt."
  },
  {
    id: "2",
    name: "Meatballs with cream sauce",
    src: "https://images.immediate.co.uk/production/volatile/sites/2/2019/04/Dum-Aloo-e163632.jpg?quality=45&resize=768,574",
    alt: "Ctoarto",
    prepTime: 25,
    ingredients: ["chicken", "cream", "lemon"],
    toTry: false,
    tried: false,
    directions:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae ratione assumenda quas eveniet recusandae odit quasi? Odit, iste aut perferendis amet enim at animi? Quaerat corrupti officia soluta modi natus."
  },
  {
    id: "3",
    name: "Turkey Tetrazzini",
    src: "https://static01.nyt.com/images/2021/11/10/dining/08PADMAREX/merlin_196956633_1083a8dd-ac4a-425d-9c3a-fe778f429a94-articleLarge.jpg",
    alt: "Chicken based with tomato and basil",
    prepTime: 20,
    ingredients: ["Tureky", "mushrooms", "garlic"],
    toTry: true,
    tried: false,
    directions:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae ratione assumenda quas eveniet recusandae odit quasi? Odit, iste aut perferendis amet enim at animi? Quaerat corrupti officia soluta modi natus."
  },
  {
    id: "4",
    name: "Prawn Linguine",
    src: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2020/07/16/0/FNM_090120-Classic-Shrimp-Scampi_s4x3.jpg.rend.hgtvcom.616.462.suffix/1594915956100.jpeg",
    alt: "Chicken based with tomato and basil",
    prepTime: 35,
    ingredients: ["prawn", "pasta", "lemon"],
    toTry: false,
    tried: true,
    directions:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae ratione assumenda quas eveniet recusandae odit quasi? Odit, iste aut perferendis amet enim at animi? Quaerat corrupti officia soluta modi natus."
  },
  {
    id: "5",
    name: "Spagetti Alforto",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIN4a5k69lhV35fBjQzpO7Vcl-GxeVVJnSuw&usqp=CAU",
    alt: "Chicken based with tomato and basil",
    prepTime: 25,
    ingredients: ["pasta", "sausage", "spinach"],
    toTry: false,
    tried: false,
    directions:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae ratione assumenda quas eveniet recusandae odit quasi? Odit, iste aut perferendis amet enim at animi? Quaerat corrupti officia soluta modi natus."
  },

  {
    id: "6",
    name: "Pasta arabiatta",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8xll8gcfPmb3I03w07WTXdj1aw9Y1WiwcuA&usqp=CAU",
    alt: "Chicken based with tomato and basil",
    prepTime: 30,
    ingredients: ["pasta", "tomato", "spinach"],
    toTry: false,
    tried: true,
    directions:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae ratione assumenda quas eveniet recusandae odit quasi? Odit, iste aut perferendis amet enim at animi? Quaerat corrupti officia soluta modi natus."
  }
];

const addRecipe = (name, prepTime, ingredients, direction, recipeURL) => {
  const id = uuidv4();
  recipeList.push({
    id: id,
    name,
    src: "",
    alt: "Recipe",
    prepTime,
    ingredients: ingredients.split(" "),
    toTry: false,
    tried: false,
    direction,
    recipeURL
  });
};

const findRecipe = (id) => recipeList.filter((recipe) => recipe.id === id);

const updateToTry = (id) => {
  let recipeListUpdated = recipeList.map((recipe) => {
    if (recipe.id === id) {
      recipe.toTry = !recipe.toTry;
    }
    return recipe;
  });
  recipeList = recipeListUpdated;
  return findRecipe(id);
};

const updateToTryHomePage = (id) => {
  let recipeListUpdated = recipeList.map((recipe) => {
    if (recipe.id === id) {
      recipe.toTry = !recipe.toTry;
    }
    return recipe;
  });
  recipeList = recipeListUpdated;
  return recipeList;
};

const updateTried = (id) => {
  let recipeListUpdated = recipeList.map((recipe) => {
    if (recipe.id === id) {
      recipe.tried = !recipe.tried;
    }
    return recipe;
  });
  recipeList = recipeListUpdated;
  return findRecipe(id);
};

module.exports = {
  recipeList,
  updateToTry,
  findRecipe,
  addRecipe,
  updateTried,
  updateToTryHomePage
};
