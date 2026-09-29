import { TYPE_LABELS } from "./data.js";

export function filterByType(list, typeName) {
  if (!typeName) return list;
  return list.filter((p) => p.apiTypes.some((t) => t.name === typeName));
}

export function sortPokemons(list, criterion) {
  if (criterion === "id") return list;
  if (criterion === "name")
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  if (criterion === "type")
    return [...list].sort((a, b) =>
      a.apiTypes[0].name.localeCompare(b.apiTypes[0].name)
    );
  return [...list].sort((a, b) => a[criterion] - b[criterion]);
}

export function renderPokemons(pokemons) {
  const main = document.querySelector("main");
  main.innerHTML = "";
  for (const pokemon of pokemons) {
    main.appendChild(pokemon.displayCard());
  }
}

export function buildTypeButtons(pokemons, onTypeSelected) {
  const nav = document.querySelector("#types");
  nav.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.textContent = "Tous";
  allBtn.classList.add("active");
  allBtn.addEventListener("click", () => onTypeSelected(null, allBtn));
  nav.appendChild(allBtn);

  const allTypes = pokemons.flatMap((p) => p.apiTypes);
  const typeNames = [...new Set(allTypes.map((t) => t.name))].sort((a, b) =>
    TYPE_LABELS[a].localeCompare(TYPE_LABELS[b])
  );

  for (const typeName of typeNames) {
    const button = document.createElement("button");
    button.textContent = TYPE_LABELS[typeName];
    button.style.backgroundColor = allTypes.find(
      (t) => t.name === typeName
    ).color;
    button.addEventListener("click", () => onTypeSelected(typeName, button));
    nav.appendChild(button);
  }
}

export function setTypeButtonActive(button) {
  const nav = document.querySelector("#types");
  for (const b of nav.querySelectorAll("button")) {
    b.classList.remove("active");
  }
  button.classList.add("active");
}
