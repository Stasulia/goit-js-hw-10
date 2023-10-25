import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_n895sUKQ0Sl0Tmpt66VqzsxDp8YSVWYEWCbf719jKIZjS4KBvyks0z04Sam8XJ7i";
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
 return axios.get('/breeds')
.then(response => response.data);
};

function fetchCatByBreed(breedId){
 return axios.get(`/images/search?breed_ids=${breedId}`)
.then(resp => {
    return resp.data});
};

export { fetchBreeds, fetchCatByBreed };