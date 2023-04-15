import db from "./firebase-config.js";
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';

//get variables from search
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchInput = urlParams.get('search');
console.log(searchInput);

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

      const clicks = doc.data().clicks;

      // Increase clicks by 1
      const newClicks = clicks + 1;

      // Update the document with the new clicks value
      updateDoc(doc.ref, { clicks: newClicks })
        .then(() => {
          console.log('Clicks updated successfully!');
        })
        .catch((error) => {
          console.log('Error updating clicks:', error);
        });
    });
  }
}).catch((error) => {
  console.log(error);
});
