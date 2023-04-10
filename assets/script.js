var pantryListParentDiv = document.querySelector("#food-list");
var foodTextInputEl = document.querySelector("#food-text-input");
var submitFoodBtn = document.querySelector("#submit-food-button");
var recipeListParentDiv = document.querySelector("#recipe-display");

// var recipePagePreview = document.querySelector("#recipe");

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
  generateURL();
  apiCall();
  drinkApiCall();
}

// have a div encompassing current recipes in view with and ID to easily access it. Then when new API call is made, in the .then
// call a function that accesses that encompassing div and deletes all its children and then rerender them. 

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

// recipePagePreview.addEventListener("click", getRecipeID);

//function to generate url for the API call

function generateURL() {
  outputstring = "";
  for (i = 0; i < ingredients.length; i++) {
    if (i < ingredients.length - 1) {
      outputstring = outputstring + ingredients[i] + "%2C";
    } else {
      outputstring =
        outputstring + ingredients[i] + "&number=6&ignorePantry=true&ranking=1";
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
  refreshRecipies();
  console.log(response);
  for (i = 0; i < response.length; i++) {
    var recipePreview = document.createElement("div");
    var recipeTitleEl = document.createElement("h3");
    var recipeImageEl = document.createElement("img");
    recipeImageEl.src = `${response[i].image}`;
    recipeTitleEl.textContent = response[i].title;
    recipePreview.prepend(recipeImageEl);
    recipeListParentDiv.appendChild(recipePreview);
    recipePreview.appendChild(recipeTitleEl);
    console.log(recipeImageEl.src);
  }
}

function refreshRecipies() {
  while (recipeListParentDiv.hasChildNodes())
  recipeListParentDiv.removeChild(recipeListParentDiv.firstChild)
}

//drink API call that returns a random assortment of drinks, they will display all sorts of information on the drink, might need to make a separate display for this.
function drinkApiCall() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9e31a75844mshb2d4a2fa7b4e020p1e0a93jsn06a74ba6a801",
      "X-RapidAPI-Host": "drinks-digital1.p.rapidapi.com",
    },
  };

  fetch("https://drinks-digital1.p.rapidapi.com/v1/cocktails?limit=6", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
