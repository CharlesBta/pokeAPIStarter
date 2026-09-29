import { fetchPokemons } from "./api.js";
import { Pokemon } from "./Pokemon.js";
import {
  filterByType,
  sortPokemons,
  renderPokemons,
  buildTypeButtons,
} from "./ui.js";

let allPokemons = [];
const selectedTypes = new Set();
let currentSort = "id";

function render() {
  renderPokemons(
    sortPokemons(filterByType(allPokemons, selectedTypes), currentSort)
  );
}

function selectType(typeName, button) {
  if (typeName) {
    if (selectedTypes.delete(typeName)) {
      button.classList.remove("active");
    } else {
      selectedTypes.add(typeName);
      button.classList.add("active");
    }
  } else {
    selectedTypes.clear();
    for (const b of document.querySelectorAll("#types button")) {
      b.classList.remove("active");
    }
  }
  const tous = document.querySelector("#types button");
  if (selectedTypes.size === 0) tous.classList.add("active");
  else tous.classList.remove("active");
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

  selectedTypes.clear();
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
