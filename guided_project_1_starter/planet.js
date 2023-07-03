let nameH1;
let terrainSpan;
let popSpan;
let climSpan;
let charUl;
let filmsUl;

const baseUrl = `https://swapi2.azurewebsites.net/api`;

addEventListener("DOMContentLoaded", () => {
  nameH1 = document.querySelector("h1#planet");
  terrainSpan = document.querySelector("span#terrain");
  popSpan = document.querySelector("span#population");
  climSpan = document.querySelector("span#climate");
  charUl = document.querySelector("#characters>ul");
  filmsUl = document.querySelector("#films>ul");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getPlanet(id);
});

async function getPlanet(id) {
  try {
    const planet = await fetchPlanet(id);
    planet.characters = await fetchCharacters(planet);
    planet.films = await fetchFilms(planet);
    renderPlanet(planet);
  } catch (err) {
    console.log(`Error reading planet ${id} data.`, err.message);
  }
}

async function fetchPlanet(id) {
  const planetUrl = `${baseUrl}/planets/${id}`;
  return await fetch(planetUrl).then((res) => res.json());
}

async function fetchCharacters(planet) {
  const url = `${baseUrl}/planets/${planet.id}/characters`;
  const characters = await fetch(url).then((res) => res.json());
  return characters;
}

async function fetchFilms(planet) {
  const url = `${baseUrl}/planets/${planet.id}/films`;
  const films = await fetch(url).then((res) => res.json());
  return films;
}

const renderPlanet = (planet) => {
  document.title = `SWAPI - ${planet?.name}`; // Just to make the browser tab say their name
  nameH1.textContent = planet?.name;
  terrainSpan.textContent = planet?.terrain;
  popSpan.textContent = planet?.population;
  climSpan.textContent = planet?.climate;

  const charLis = planet?.characters?.map(character =>
    `<li><a href="/character.html?id=${character.id}">${character.name}</a></li>`);
    
    const filmsLis = planet?.films?.map(
      (film) => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`
    );
  charUl.innerHTML = charLis.join("");
  filmsUl.innerHTML = filmsLis.join("");
};
