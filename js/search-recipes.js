import db from "./firebase-config.js";
import { collection, query, where, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

//get variables from search
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchInput = urlParams.get('search');
console.log(searchInput);

//modify title
const title = document.getElementById('title-recipe');
title.textContent = `${searchInput} Recipe`;


//Pull data after search input
const recipesQuery = query(collection(db, 'recipes'), where('name', '==', searchInput));

// Retrieve the matching documents
getDocs(recipesQuery).then((querySnapshot) => {
  if (querySnapshot.empty) {
    console.log('No matching documents.');
  } else {
    querySnapshot.forEach((doc) => {
      // Access the data for each matching document
      console.log(doc.id, '=>', doc.data());

      const name = doc.data().name;
      const description = doc.data().description;
      const mainImg = doc.data().imageUrl;
      const ingredients = doc.data().ingredients;
      const step1 = doc.data().step1;
      const step1Img = doc.data().step1Img;
      const step2 = doc.data().step2;
      const step2Img = doc.data().step2Img;
      const step3 = doc.data().step3;
      const step3Img = doc.data().step3Img;

      // Take divs
      const recipeName = document.getElementById('title-recipe');
      const recipeDescriptor = document.getElementById('descriptor');
      const recipeIngredients = document.getElementById('recipeIngredients');
      const recipeMainImg = document.getElementById('sbs-main-img');
      const recipeStep1 = document.getElementById('step1');
      const recipeStep1Img = document.getElementById('step1-img');
      const recipeStep2 = document.getElementById('step2');
      const recipeStep2Img = document.getElementById('step2-img');
      const recipeStep3 = document.getElementById('step3');
      const recipeStep3Img = document.getElementById('step3-img');

      // Modify divs
      recipeName.textContent = `${name}`;
      recipeDescriptor.textContent = `${description}`;
      recipeMainImg.setAttribute('src', mainImg);
      recipeIngredients.textContent = `${ingredients}`;
      recipeStep1.textContent = `${step1}`;
      recipeStep1Img.setAttribute('src', step1Img);
      recipeStep2.textContent = `${step2}`;
      recipeStep2Img.setAttribute('src', step2Img);
      recipeStep3.textContent = `${step3}`;
      recipeStep3Img.setAttribute('src', step3Img);


      console.log(description);
    });
  }
}).catch((error) => {
  console.log(error);
});
