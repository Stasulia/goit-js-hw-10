import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { createMarkup } from "./markup";
import { selectEl, loaderEl, errorEl, infoAboutCatEl } from "./refs"

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css'

errorEl.classList.add('hidden');

selectEl.addEventListener('change', onSelect)

window.addEventListener('load', onLoad) 

function onLoad() {
    fetchBreeds();
    Notiflix.Notify.info(loaderEl.textContent)
}

function getBreedList(breed) {
    selectEl.innerHTML = breed
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
} 

//function fetchBreedsList() {
    fetchBreeds()
    .then(result => {
        getBreedList(result);
    })
    .then (() => new SlimSelect({ select: `.breed-select`}))
    .catch(() => {
        Notiflix.Notify.failure(errorEl.textContent, {timeout: 4000, userIcon: false});
    })
     .finally(() => {
      // Notiflix.Notify.info(loaderEl.textContent)
       loaderEl.classList.add('hidden');
    });
//}
    function onSelect(event){
    const selectedBreedId = event.currentTarget.value;
   // console.log(selectedBreedId);
    
    fetchCatByBreed(selectedBreedId)
     .then(data => {
        infoAboutCatEl.innerHTML = createMarkup(data);
        infoAboutCatEl.classList.remove('.hidden');
    }).catch(() => {
        Notiflix.Notify.failure(errorEl.textContent, {timeout: 4000,userIcon: false});
    })
    .finally(() => {
      // Notiflix.Notify.info(loaderEl.textContent)
       loaderEl.classList.add('hidden');
    });
}

//  function createAddMarkup(data) {
//     const markup = createMarkup(data);
//     addMarkup(markup);
// }

// function addMarkup(markup) {
//    infoAboutCatEl.insertAdjacentHTML('afterbegin', markup);
// }

// function createMarkup(data) {
//     return data
//     .map (({url, name, temperament, description}) => {
//     return `<img src="${url}" alt="${name}" width="500">
//     <div class="form">
//       <h2 class="title">${name}</h2>
//       <p class="text">${description}</p>
//       <p class="text">${temperament}</p>
//     </div>`;
// })
//     .join('');
// }
  //fetchBreedsList();

