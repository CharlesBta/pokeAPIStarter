import { Type } from "./Type.js";
import { getShinySprite } from "./api.js";
import { TYPE_LABELS, capitalize, getStat } from "./data.js";

export class Pokemon {
  constructor(data) {
    this.id = data.id;
    this.image =
      data.sprites.other["official-artwork"].front_default ||
      data.sprites.front_default;
    this.name = capitalize(data.name);
    this.apiTypes = data.types.map((t) => new Type(t));
    this.hp = getStat(data, "hp");
    this.attack = getStat(data, "attack");
    this.defense = getStat(data, "defense");
    this.special_attack = getStat(data, "special-attack");
    this.special_defense = getStat(data, "special-defense");
    this.speed = getStat(data, "speed");
  }

  displayCard() {
    const article = document.createElement("article");

    const color = this.apiTypes[0].color;
    article.style.borderColor = color;
    article.style.backgroundColor = color;

    const types = this.apiTypes
      .map((t) => TYPE_LABELS[t.name] || t.name)
      .join(", ");

    article.innerHTML = `
      <figure>
        <picture>
          <img src="${this.image}" alt="Image ${this.name}" />
          <img class="shiny" alt="" />
        </picture>
        <figcaption>
          <span class="types">${types}</span>
          <h2>${this.name}</h2>
          <ol>
            <li>Points de vie : ${this.hp}</li>
            <li>Attaque : ${this.attack}</li>
            <li>Défense : ${this.defense}</li>
            <li>Attaque spécial : ${this.special_attack}</li>
            <li>Vitesse : ${this.speed}</li>
          </ol>
        </figcaption>
      </figure>
    `;

    const shinyImg = article.querySelector("img.shiny");
    article.addEventListener(
      "mouseenter",
      () => {
        if (!shinyImg.src) {
          getShinySprite(this.id).then((shiny) => {
            if (shiny) shinyImg.src = shiny;
          });
        }
      },
      { once: true }
    );

    return article;
  }
}
