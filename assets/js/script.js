var pantryListParentDiv = document.querySelector('#food-list');
var foodTextInputEl = document.querySelector('#food-text-input');
var submitFoodBtn = document.querySelector('#submit-food-button');


function addFoodInput () {
var foodInput = foodTextInputEl.value;
var pantryList = document.createElement('ul');
var newFood = document.createElement('li')
newFood.textContent = foodInput;
pantryListParentDiv.appendChild(pantryList);
pantryList.appendChild(newFood);

console.log(foodInput);
}


submitFoodBtn.addEventListener("click", addFoodInput);