import { cardContainer } from "../../index.js";

export function createCharacterCard(url, character, status, type, episodes) {
  const newCard = document.createElement("li");
  newCard.classList.add("card");
  newCard.innerHTML = `
  <div class="card__image-container">
    <img
      class="card__image"
      src="${url}"
      alt="${character}"
    />
    <div class="card__image-gradient"></div>
  </div>
  <div class="card__content">
    <h2 class="card__title">${character}</h2>
    <dl class="card__info">
      <dt class="card__info-title">Status</dt>
      <dd class="card__info-description">${status}</dd>
      <dt class="card__info-title">Type</dt>
      <dd class="card__info-description">${type}</dd>
      <dt class="card__info-title">Occurrences</dt>
      <dd class="card__info-description">${episodes}</dd>
    </dl>
  </div>`;
  cardContainer.append(newCard);
}
