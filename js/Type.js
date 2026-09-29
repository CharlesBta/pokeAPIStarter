export class Type {
  constructor(data) {
    this.name = data.type.name;
    this.image = data.image || null;
    this.color = this.getColorHexa();
  }

  getColorHexa() {
    switch (this.name) {
      case "grass":
        return "#3d7a6b";
      case "fire":
        return "#f08030";
      case "water":
        return "#5090e0";
      case "poison":
        return "#a040a0";
      case "bug":
        return "#a8b820";
      case "flying":
        return "#a890f0";
      case "normal":
        return "#a8a878";
      case "electric":
        return "#f8d030";
      case "fairy":
        return "#f070b8";
      case "psychic":
        return "#f85888";
      case "ice":
        return "#98d8d8";
      case "fighting":
        return "#c03028";
      case "rock":
        return "#b8a038";
      case "ground":
        return "#e0c068";
      case "ghost":
        return "#705898";
      case "steel":
        return "#b8b8d0";
      case "dark":
        return "#705848";
      case "dragon":
        return "#7038f8";
      default:
        return "#808080";
    }
  }
}
