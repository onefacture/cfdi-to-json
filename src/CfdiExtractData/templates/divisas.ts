import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "divisas:Divisas": {
    position: "divisas",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "divisas:Divisas": {
    position: "divisas",
    attributes: ["version", "tipoOperacion"]
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
