var pantryListParentDiv = document.querySelector("#food-list");
var foodTextInputEl = document.querySelector("#food-text-input");
var submitFoodBtn = document.querySelector("#submit-food-button");

//adding new food item via button
function addFoodInput() {
  var foodInput = foodTextInputEl.value;
  var pantryList = document.createElement("ul");
  var newFood = document.createElement("li");
  newFood.textContent = foodInput;
  pantryListParentDiv.appendChild(pantryList);
  pantryList.appendChild(newFood);

  console.log(foodInput);
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
fetch(
  "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=apples%2Cflour%2Csugar&number=5&ignorePantry=true&ranking=1",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
