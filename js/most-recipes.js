import db from "./firebase-config.js";
import { collection, query, orderBy, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
const recCol = collection(db, 'recipes');

// read data 
function populateRecipeInfo(recipeIndex, nameId, timeId, diffId, imgId, linkId) {
  // Get document reference
  const docRef = doc(db, 'recipes', `${recipeIndex}`);

  getDoc(docRef).then((doc) => {
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
      recipeDiff.textContent = `${difficulty}`;
      recipeImg.setAttribute('src', `${img}`);
      recipeLink.setAttribute("href", `step-by-step.html?search=${name}`);

    } else {
      console.log(`No recipe found at index ${recipeIndex}`);
    }
  }).catch((error) => {
    console.log(error);
  });
}

// random recipes
const recQuery = query(recCol);

getDocs(recQuery).then((querySnapshot) => {
  const recipes = [];

  querySnapshot.forEach((doc) => {
    recipes.push(doc);
  });
  const shuffledRecipes = recipes.sort(() => Math.random() - 0.5);

  // Get the first 4 randomly selected recipes and populate the recipe information
  for (let i = 0; i < 4; i++) {
    const recipe = shuffledRecipes[i];
    populateRecipeInfo(recipe.id, `rec-name-random-${i}`,`rec-time-random-${i}`, `rec-difficulty-random-${i}`, `img-random-${i}`,  `link-random-${i}`);
  }



}).catch((error) => {
  console.log("HERE" + error);
});


// Popular recipes
const recQuery0 = query(recCol, orderBy("clicks", "desc"));
getDocs(recQuery0).then((querySnapshot) => {
  let i = 0;
  querySnapshot.forEach((doc) => {
    populateRecipeInfo(doc.id, `rec-name-${i}`, `rec-time-${i}`, `rec-difficulty-${i}`, `rec-img-${i}`, `link-popular-${i}`);
    i++;
  });
}).catch((error) => {
  console.log(error);
});

// Recent recipes
const recQuery1 = query(recCol, orderBy("date", "desc"));
getDocs(recQuery1).then((querySnapshot) => {
  let i = 0;
  querySnapshot.forEach((doc) => {
    populateRecipeInfo(doc.id, `rec-name-mr-${i}`, `rec-time-mr-${i}`, `rec-difficulty-mr-${i}`, `rec-img-mr-${i}`, `link-recent-${i}`);
    i++;
  });
}).catch((error) => {
  console.log(error);
});

// fast recipes
const recQuery2 = query(recCol, orderBy("time", "asc"));
getDocs(recQuery2).then((querySnapshot) => {
  let i = 0;
  querySnapshot.forEach((doc) => {
    populateRecipeInfo(doc.id, `rec-name-mf-${i}`, `rec-time-mf-${i}`, `rec-difficulty-mf-${i}`, `rec-img-mf-${i}`, `link-fast-${i}`);
    i++;
  });
}).catch((error) => {
  console.log(error);
});

