// import { loadPartialConfigAsync } from "@babel/core";
import { createCharacterCard } from "./components/card/card.js";

export const cardContainer = document.querySelector(
  '[data-js="card-container"]'
);
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const searchBarInput = document.querySelector('[class="search-bar__input"]');
const navigation = document.querySelector('[data-js="navigation"]');
export const prevButton = document.querySelector('[data-js="button-prev"]');
export const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 42;
let page = 1;
let searchQuery = "";

export async function fetchCharacters(page, name) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`
    );
    const data = await response.json();

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

    pagination.textContent = `${page} / ${maxPage}`;

    return characters;
  } catch (error) {
    return error;
  }
}
fetchCharacters(page, searchQuery);

searchBar.addEventListener("submit", (event) => {
  // console.log(event.target.value);
  event.preventDefault(); // Prevent page refresh

  const formData = new FormData(event.target); // Get from form
  const data = Object.fromEntries(formData); // Make data readable
  searchQuery = data.query;
  cardContainer.innerHTML = ""; // Clear card container before search
  page = 1;
  console.log("Submit: ", page);
  fetchCharacters(page, searchQuery);
  searchBarInput.value = "";
});

nextButton.addEventListener("click", () => {
  searchQuery = ""; // Clear search bar when clicking through pages
  if (page <= maxPage && page >= 1) {
    page++;
    console.log("Next: ", page);
    cardContainer.innerHTML = "";
    fetchCharacters(page, searchQuery);
  }
});

prevButton.addEventListener("click", () => {
  searchQuery = ""; // Clear search bar when clicking through pages
  if (page <= maxPage && page > 1) {
    page--;
    console.log("Previous: ", page);
    cardContainer.innerHTML = "";
    fetchCharacters(page, searchQuery);
  }
});
