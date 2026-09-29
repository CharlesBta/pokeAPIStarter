export const GENERATIONS = {
  1: { offset: 0, limit: 151 },
  2: { offset: 151, limit: 100 },
  3: { offset: 251, limit: 135 },
  4: { offset: 386, limit: 107 },
  5: { offset: 493, limit: 156 },
  6: { offset: 649, limit: 72 },
  7: { offset: 721, limit: 88 },
  8: { offset: 809, limit: 96 },
};

export const TYPE_LABELS = {
  grass: "Plante",
  fire: "Feu",
  water: "Eau",
  poison: "Poison",
  bug: "Insecte",
  flying: "Vol",
  normal: "Normal",
  electric: "Électrik",
  fairy: "Fée",
  psychic: "Psy",
  ice: "Glace",
  fighting: "Combat",
  rock: "Roche",
  ground: "Sol",
  ghost: "Spectre",
  steel: "Acier",
  dark: "Ténèbres",
  dragon: "Dragon",
};

export function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getStat(pokemon, statName) {
  const stat = pokemon.stats.find((s) => s.stat.name === statName);
  return stat ? stat.base_stat : "?";
}
