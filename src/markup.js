export function createMarkup(data) {
    const {breeds, url} = data[0];
    const {name, temperament, description} = breeds[0];
    const catInfo = `<img src="${url}" alt="${name}" width="500">
    <div class="form">
      <h2 class="title">${name}</h2>
      <p class="text">${description}</p>
      <p class="text">${temperament}</p>
    </div>`
    infoAboutCatEl.insertAdjacentHTML('afterbegin', catInfo);
  }

