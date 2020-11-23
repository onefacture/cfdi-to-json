import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "enajenaciondeacciones:EnajenaciondeAcciones": {
    position: "enajenacionDeAcciones",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "enajenaciondeacciones:EnajenaciondeAcciones": {
    position: "enajenacionDeAcciones",
    attributes: [
      "version",
      "contratoIntermediacion",
      "ganancia",
      "perdida",
    ]
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
