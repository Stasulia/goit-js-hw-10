import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_n895sUKQ0Sl0Tmpt66VqzsxDp8YSVWYEWCbf719jKIZjS4KBvyks0z04Sam8XJ7i";
axios.defaults.baseUrl = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
 axios.get('/breeds')
.then(response => {
   console.log(response);
}).then(data => console.log(data))
//return response.data;
};
//}

function fetchCatByBreed(){
 axios.get(`/images/search?breed_ids=${breedId}`)
.then(response => {
   // console.log(response);
 //}).then(data => console.log(data))
 return response.data;
});
}

export { fetchBreeds, fetchCatByBreed };