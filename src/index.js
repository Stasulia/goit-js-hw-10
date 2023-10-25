import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { createMarkup } from "./markup";
import { selectEl, loaderEl, errorEl, infoAboutCatEl } from "./refs"

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css'

errorEl.classList.add('hidden');

selectEl.addEventListener('change', onSelect)

function onLoad() {
    loaderEl.classList.remove('hidden')
}

function getBreedList(breed) {
    selectEl.innerHTML = breed
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
} 

function fetchBreedsList() {
    onLoad();
    fetchBreeds()
    .then(result => {
        getBreedList(result);
    })
    .then (() => new SlimSelect({ select: `.breed-select`, settings: {placeholderText: ' ' }}))
    .catch(() => {
        Notiflix.Notify.failure(errorEl.textContent, {timeout: 4000, userIcon: false});
    })
     .finally(() => {
       loaderEl.classList.add('hidden');
    });
}

    function onSelect(event){
    onLoad();
    const selectedBreedId = event.currentTarget.value;
    infoAboutCatEl.classList.add('.hidden');

    fetchCatByBreed(selectedBreedId)
     .then(data => {
        infoAboutCatEl.innerHTML = createMarkup(data);
        infoAboutCatEl.classList.remove('.hidden');
    }).catch(() => {
        Notiflix.Notify.failure(errorEl.textContent, {timeout: 4000,userIcon: false});
    })
    .finally(() => {
       loaderEl.classList.add('hidden');
    });
}

 fetchBreedsList();

