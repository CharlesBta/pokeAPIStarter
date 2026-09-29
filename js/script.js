import { fetchPokemons } from "./api.js";
import { Pokemon } from "./Pokemon.js";
import {
  filterByType,
  sortPokemons,
  renderPokemons,
  buildTypeButtons,
  setTypeButtonActive,
} from "./ui.js";

let allPokemons = [];
let currentType = null;
let currentSort = "id";

function render() {
  renderPokemons(
    sortPokemons(filterByType(allPokemons, currentType), currentSort)
  );
}

function selectType(typeName, button) {
  currentType = typeName;
  setTypeButtonActive(button);
  render();
}

async function loadData(generation) {
  try {
    const data = await fetchPokemons(generation);
    allPokemons = data.map((d) => new Pokemon(d));
    console.log(allPokemons);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return;
  }

  currentType = null;
  buildTypeButtons(allPokemons, selectType);
  render();
}

loadData(1);

const select = document.querySelector("#generation");
select.addEventListener("change", (event) => {
  const generation = event.target.value;
  console.log("Génération sélectionnée :", generation);
  loadData(generation);
});

const tri = document.querySelector("#tri");
tri.addEventListener("change", (event) => {
  currentSort = event.target.value;
  render();
});
