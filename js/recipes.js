import db from "./firebase-config.js";
import { collection, query, where, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

//get variables from url 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const cuisine = urlParams.get('cuisine');

//modify title
const title = document.getElementById('title-cuisine');
title.textContent = `${cuisine} Recipes`;

const recCol = collection(db, 'recipes');

//Pull all recipes when URL is populated
function populateRecipeInfo(recipeIndex, nameId, timeId, diffId, imgId, linkId) {
  // Query recipes collection for recipes with the specified cuisine
  const recipesQuery = query(recCol, where('cuisine', '==', cuisine));

  // Get document data for recipe at specified index
  getDocs(recipesQuery).then((querySnapshot) => {
    const doc = querySnapshot.docs[recipeIndex];
    if (doc.exists()) {
      const recipes = doc.data();

      // Pull data
      const name = recipes.name;
      const difficulty = recipes.difficulty;
      const time = recipes.time;
      const img = recipes.imageUrl;

      // Take divs
      const recipeName = document.getElementById(nameId);
      const recipeTime = document.getElementById(timeId);
      const recipeDiff = document.getElementById(diffId);
      const recipeImg = document.getElementById(imgId);
      const recipeLink = document.getElementById(linkId);

      // Modify divs
      recipeName.textContent = `${name}`;
      recipeTime.textContent = `${time}`;
      recipeDiff.textContent = `Difficulty: ${difficulty}`;
      recipeImg.setAttribute('src', img);
      recipeLink.setAttribute("href", `step-by-step.html?search=${name}`);
    
    } else {
      console.log(`No recipe found at index ${recipeIndex}`);
    }
  }).catch((error) => {
    console.log(error);
  });
}




// Populate recipes
populateRecipeInfo(0, 'rec-name-0', 'rec-time-0', 'rec-difficulty-0', 'rec-img-0', 'link0');
populateRecipeInfo(1, 'rec-name-1', 'rec-time-1', 'rec-difficulty-1', 'rec-img-1', 'link1');
populateRecipeInfo(2, 'rec-name-2', 'rec-time-2', 'rec-difficulty-2', 'rec-img-2', 'link2');
