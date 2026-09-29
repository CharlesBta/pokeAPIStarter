import { GENERATIONS } from "./data.js";

export async function fetchPokemons(generation) {
  const { offset, limit } = GENERATIONS[generation];
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  const list = await response.json();
  return Promise.all(
    list.results.map((p) => fetch(p.url).then((res) => res.json()))
  );
}

const shinyCache = {};

export async function getShinySprite(id) {
  if (!(id in shinyCache)) {
    try {
      const response = await fetch(`https://tyradex.app/api/v1/pokemon/${id}`);
      const data = await response.json();
      shinyCache[id] = data.sprites.shiny;
    } catch (error) {
      shinyCache[id] = null;
    }
  }
  return shinyCache[id];
}
