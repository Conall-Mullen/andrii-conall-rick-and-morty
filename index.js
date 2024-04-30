// import { loadPartialConfigAsync } from "@babel/core";
import { createCharacterCard } from "./components/card/card.js";

export const cardContainer = document.querySelector(
  '[data-js="card-container"]'
);
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States;
const maxPage = 1;
const page = 1;
let searchQuery = "";

// API
// const rickAndMortyApi = "https://rickandmortyapi.com/api/character/";

async function fetchCharacters(name) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=1&name=${name}`
    );
    const data = await response.json();
    const characters = data.results;

    console.log(characters);

    characters.forEach((character) => {
      createCharacterCard(
        character.image,
        character.name,
        character.status,
        character.type,
        character.episode.length
      );
    });

    return characters;
  } catch (error) {
    return error;
  }
}
fetchCharacters(searchQuery);

searchBar.addEventListener("submit", (event) => {
  // console.log(event.target.value);
  event.preventDefault(); // Prevent page refresh

  const formData = new FormData(event.target); // Get from form
  const data = Object.fromEntries(formData); // Make data readable

  searchQuery = data.query;
  cardContainer.innerHTML = ""; // Clear card container before search
  fetchCharacters(searchQuery);
});
