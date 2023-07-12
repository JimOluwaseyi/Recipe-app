const userInput = document.querySelector("#user-input");
const searchBtn = document.querySelector(".searchBtn");
const recipePic = document.querySelector(".recipe-pic");
const recipeNameBg = document.querySelector(".recipeNameBg");
const recipeH1 = document.querySelector("#recipe-name");
const recipeArea = document.querySelector("#recipeArea");
const ulOne = document.querySelector(".col-1");
const ulTwo = document.querySelector(".col-2");
const error = document.querySelector(".error");
const recipeBtn = document.querySelector("#recipeBtn");
const recipeDiv = document.querySelector(".recipeDiv");
const recipeInstruction = document.querySelector("#recipeInstruction");
const whiteContainer = document.querySelector(".container");
const cancelBtn = document.querySelector("#cancel");

//  fetch API

searchBtn.addEventListener("click", () => {
  let inputValue = userInput.value;
  console.log(inputValue);
  if (inputValue === "") {
    error.innerText = "Input Field  Cannot Be Empty";

    setTimeout(() => {
      error.innerText = "";
    }, 3000);
  } else {
    userInput.value = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
      .then((res) => res.json())
      .then((data) => {
        let rand = Math.floor(Math.random() * (data.meals.length - 1))
        console.log(rand)
        let myRecipeMeal = data.meals[rand];
        if (myRecipeMeal === null) {
          error.innerText = "Invalid Input";
          setTimeout(() => {
            error.innerText = "";
          }, 3000);
        } else {
          const img = document.createElement("img");
          recipePic.innerHTML = "";
          recipePic.append(img);
          img.src = myRecipeMeal["strMealThumb"];
          recipeH1.innerText = myRecipeMeal["strMeal"];
          recipeArea.innerText = myRecipeMeal["strArea"];
          recipeNameBg.style.display = "block";
          recipeBtn.style.display = "block";
          ulOne.innerHTML = "";
          ulTwo.innerHTML = "";
          // console.log(myRecipeMeal);

          for (let i = 1; i <= 14; i++) {
            const li = document.createElement("li");
            li.innerText = myRecipeMeal[`strMeasure${i}`];
            const liTwo = document.createElement("li");
            liTwo.innerText = myRecipeMeal[`strIngredient${i}`];
            if (i <= 7) {
              ulOne.append(li);
              ulTwo.append(liTwo);
            }
          }
        }

        recipeBtn.addEventListener("click", () => {
          console.log("clicked");
          recipeDiv.style.display = "block";
          recipeInstruction.innerText = myRecipeMeal["strInstructions"];
          whiteContainer.style.display = "none";
        });

        cancelBtn.addEventListener("click", () => {
          recipeDiv.style.display = "none";
          whiteContainer.style.display = "block";
        });
      })
      .catch(() => {
        error.innerText = "Invalid Input";
      });
  }
});
