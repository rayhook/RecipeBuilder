let recipeList = [
  {
    id: 1,
    name: "Chicken parmisan",
    src: "https://static.onecms.io/wp-content/uploads/sites/9/2021/02/12/roast-chicken-with-chile-basil-vinaigrette-charred-broccoli-potatoes-FT-RECIPE0321.jpg",
    alt: "Chicken based with tomato and basil",
    prepTime: 10,
    ingredients: ["chicken", "cabbage", "onion"],
    toTry: true,
    tried: false,
    directions: "In vitae lorem nunc. Pellentesque eu elit vel eros pharetra tempus."
  },
  {
    id: 2,
    name: "Meatballs with cream sauce",
    src: "https://images.immediate.co.uk/production/volatile/sites/2/2019/04/Dum-Aloo-e163632.jpg?quality=45&resize=768,574",
    alt: "Ctoarto",
    prepTime: 10,
    ingredients: ["chicken", "cream", "lemon"],
    toTry: false,
    tried: false
  },
  {
    id: 3,
    name: "Turkey Tetrazzini",
    src: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/chicken-recipes-marsala-1635169090.jpg?crop=0.920xw:0.736xh;0,0.0179xh&resize=640:*",
    alt: "Chicken based with tomato and basil",
    prepTime: 10,
    ingredients: ["Tureky", "mushrooms", "garlic"],
    toTry: true,
    tried: false
  },
  {
    id: 4,
    name: "Prawn linguine",
    src: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2020/07/16/0/FNM_090120-Classic-Shrimp-Scampi_s4x3.jpg.rend.hgtvcom.616.462.suffix/1594915956100.jpeg",
    alt: "Chicken based with tomato and basil",
    prepTime: 10,
    ingredients: ["prawn", "pasta", "lemon"],
    toTry: false,
    tried: false
  },
  {
    id: 5,
    name: "Spagetti Alforto",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIN4a5k69lhV35fBjQzpO7Vcl-GxeVVJnSuw&usqp=CAU",
    alt: "Chicken based with tomato and basil",
    prepTime: 10,
    ingredients: ["pasta", "sausage", "spinach"],
    toTry: false,
    tried: false
  },

  {
    id: 6,
    name: "Pasta arabiatta",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8xll8gcfPmb3I03w07WTXdj1aw9Y1WiwcuA&usqp=CAU",
    alt: "Chicken based with tomato and basil",
    prepTime: 10,
    ingredients: ["pasta", "tomato", "spinach"],
    toTry: false,
    tried: false
  }
];

const addRecipe = (name, prepTime, ingredients, direction, recipeURL) => {
  recipeList.push({
    id: 87,
    name: name,
    src: "",
    alt: "",
    prepTime: prepTime,
    ingredients: ingredients,
    toTry: false,
    tried: false,
    direction,
    recipeURL: recipeURL
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

module.exports = { recipeList, updateToTry, findRecipe, addRecipe };
