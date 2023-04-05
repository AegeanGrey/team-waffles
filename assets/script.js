var pantryListParentDiv = document.querySelector("#food-list");
var foodTextInputEl = document.querySelector("#food-text-input");
var submitFoodBtn = document.querySelector("#submit-food-button");
var recipeListParentDiv = document.querySelector("#recipe-display");

var recipePagePreview = document.querySelector("#recipe");
var url =
  "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=";
var ingredients = [];

//adding new food item via button
//url is reset to make sure that he ending of the url doesn't repeat
function addFoodInput() {
  url =
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=";
  var foodInput = foodTextInputEl.value;
  var pantryList = document.createElement("ul");
  var newFood = document.createElement("li");
  newFood.textContent = foodInput;
  pantryListParentDiv.appendChild(pantryList);
  pantryList.appendChild(newFood);
  ingredients.push(foodInput.toLowerCase());
  console.log(foodInput);
  generateURL();
  apiCall();
}

submitFoodBtn.addEventListener("click", addFoodInput);

//api call to gather ingredients based on food
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "9e31a75844mshb2d4a2fa7b4e020p1e0a93jsn06a74ba6a801",
    "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  },
};

// if clicked, store recipe key of specic recipe into variable and then input in this following fetch request
function getRecipeID() {
  var recipeID = this[0].id;

  fetch(
    `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeID}/information`,
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
  console.log(recipeID);
}

recipePagePreview.addEventListener("click", getRecipeID);

//function to generate url for the API call

function generateURL() {
  outputstring = "";
  for (i = 0; i < ingredients.length; i++) {
    if (i < ingredients.length - 1) {
      outputstring = outputstring + ingredients[i] + "%2C";
    } else {
      outputstring =
        outputstring + ingredients[i] + "&number=5&ignorePantry=true&ranking=1";
      console.log("Output string is " + outputstring);
      url = url + outputstring;
      console.log("url is " + url);
    }
  }
}

//api call to gather all available recipies based on ingredients
function apiCall() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9e31a75844mshb2d4a2fa7b4e020p1e0a93jsn06a74ba6a801",
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((response) => displayRecipies(response))
    .catch((err) => console.error(err));
}

function displayRecipies(response) {
  console.log(response);
  for (i = 0; i < response.length; i++) {
    var recipeList = document.createElement("ul");
    var recipeListEl = document.createElement("li");
    recipeListEl.textContent = response[i].title;
    recipeListParentDiv.appendChild(recipeList);
    recipeList.appendChild(recipeListEl);
  }
}
