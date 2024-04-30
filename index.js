import { createCharacterCard } from "./components/card/card.js";

export const cardContainer = document.querySelector(
  '[data-js="card-container"]'
);
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
export const prevButton = document.querySelector('[data-js="button-prev"]');
export const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
export const maxPage = 42;
export let page = 1;
const searchQuery = "";

export async function fetchCharacters(page) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const data = await response.json();
    page = page;
    const characters = data.results;
    characters.forEach((character) => {
      createCharacterCard(
        character.image,
        character.name,
        character.status,
        character.type,
        character.episode.length
      );
    });
    console.log(characters);
    pagination.textContent = `${page} / ${maxPage}`;
    return characters;
  } catch (error) {
    return error;
  }
}

fetchCharacters(page);

nextButton.addEventListener("click", () => {
  if (page <= maxPage && page >= 1) {
    page++;
    console.log(page);
    cardContainer.innerHTML = "";
    fetchCharacters(page);
  }
});

prevButton.addEventListener("click", () => {
  if (page <= maxPage && page > 1) {
    page--;
    console.log(page);
    cardContainer.innerHTML = "";
    fetchCharacters(page);
  }
});
