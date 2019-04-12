import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "divisas:Divisas": {
        position: "divisas",
        attributes: ["version"]
      }
    };
  }

  return {
    "divisas:Divisas": {
      position: "divisas",
      attributes: ["version", "tipoOperacion"]
    }
  };
};
