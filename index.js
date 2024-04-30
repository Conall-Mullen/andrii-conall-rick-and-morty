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

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

// API
const rickAndMortyApi = "https://rickandmortyapi.com/api/character";

// TODO:
// assign api to global variable
// write async function to query the api
// print response to console

async function fetchCharacters() {
  try {
    const response = await fetch(rickAndMortyApi);
    const data = await response.json();
    const characters = data.results;

    // characters.forEach((character) => {
    //   console.log("Characters");
    // });
    return characters;
  } catch (error) {
    return error;
  }
}

const characterInfo = await fetchCharacters();
console.log(characterInfo);
characterInfo
  .filter((character) => character.name !== "Rick Sanchez")
  .forEach((character) => {
    createCharacterCard(
      character.image,
      character.name,
      character.status,
      character.type,
      character.episode.length
    );
  });
