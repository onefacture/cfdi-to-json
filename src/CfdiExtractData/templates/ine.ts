import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "ine:INE": {
    position: "ine",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "ine:INE": {
    position: "ine",
    attributes: ["version", "tipoProceso", "tipoComite", "idContabilidad"]
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
