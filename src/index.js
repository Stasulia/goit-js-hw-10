import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import { createMarkup } from "./js/markup";
import { selectEl, loaderEl, errorEl, infoAboutCatEl } from "./js/refs"

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css'

//errorEl.classList.add('is-hidden');

selectEl.addEventListener('change', onSelect)

function getBreedList(breed) {
    selectEl.innerHTML = breed
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
} 

function fetchBreedsList() {
    fetchBreeds()
    .then(result => {
        getBreedList(result);
        selectEl.classList.remove('is-hidden')
    })
    .then (() => new SlimSelect({ select: `.breed-select`, settings: {placeholderText: ' ' }}))
    .catch(() => {
        Notiflix.Notify.failure(errorEl.textContent, {timeout: 4000, userIcon: false});
    })
     .finally(() => {
      loaderEl.classList.add('is-hidden');
    });
}

    function onSelect(event){
    const selectedBreedId = event.currentTarget.value;
    infoAboutCatEl.classList.add('.is-hidden');
    loaderEl.classList.remove('is-hidden')
    fetchCatByBreed(selectedBreedId)
     .then(data => {
        infoAboutCatEl.innerHTML = createMarkup(data);
        infoAboutCatEl.classList.remove('.is-hidden');
    }).catch(() => {
        Notiflix.Notify.failure(errorEl.textContent, {timeout: 4000,userIcon: false});
    })
    .finally(() => {
      loaderEl.classList.add('is-hidden');
    });
}

 fetchBreedsList();

