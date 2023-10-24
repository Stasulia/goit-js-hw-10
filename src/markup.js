export function createMarkup(data) {
    const { breeds, url } = data[0];
    const { name, temperament, description } = breeds[0];
    const catList = `<img src="${url}" alt="${name}" width=500>
    <div class ="back-color">
  <h2 class="title">${name}</h2>
  <p class="text">${description}</p>
  <p class="text span-text"><span class="span">Temperament:</span> ${temperament}</p>
  </div>`;
  return catList;
  }

