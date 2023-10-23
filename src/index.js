import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { createMarkup } from "./markup";
import { selectEl, loaderEl, errorEl, infoAboutCatEl } from "./refs"

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css'

// const BASE_URL = "https://api.thecatapi.com/v1";
// const API_KEY = "live_n895sUKQ0Sl0Tmpt66VqzsxDp8YSVWYEWCbf719jKIZjS4KBvyks0z04Sam8XJ7i";

// async function getImage() {
//     const image = await theCatAPI.images.getImage("IMAGE_ID");
//     return image;
//   }
errorEl.classList.add('hidden');
loaderEl.classList.add('hidden');

selectEl.addEventListener('change', onSelect)

function getBreedList(breed) {
    selectEl.innerHTML = breed
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('\n');
} 

function fetchBreedsList() {
    fetchBreeds()
    .then(result => {
        getBreedList(result);
    })
    .then (() => new SlimSelect({ select: `.breed-select`}))
    .catch(() => {
        Notiflix.Notify.failure(errorEl.value);
    })
    .finally(() => {
        //Notiflix.Notify.info(loaderEl.value)
       loaderEl.classList.add('hidden');
    });
}

function onSelect(event){
    const selectedBreedId = event.currentTarget.value;
    infoAboutCatEl.classList.add('hidden');

    fetchCatByBreed(selectedBreedId)
        .then(data => {
        createAddMarkup(data);
        infoAboutCatEl.classList.remove('hidden');
    }).catch(() => {
        Notiflix.Notify.failure(errorEl.value);
    })
    .finally(() => {
        Notiflix.Notify.info(loaderEl.value)
    })
 }

 function createAddMarkup(state) {
    const markup = createMarkup(state);
    addMarkup(markup);
}

function addMarkup(markup) {
    selectEl.insertAdjacentHTML('afterbegin', markup);
}

  fetchBreedsList();

