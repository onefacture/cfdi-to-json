import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "aerolineas:Aerolineas": {
    position: "aerolineas",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "aerolineas:Aerolineas": {
    position: "aerolineas",
    attributes: ["version", "tua"],
    nodes: {
      "aerolineas:OtrosCargos": {
        position: "otrosCargos",
        attributes: ["totalCargos"],
        nodes: {
          "aerolineas:Cargo": {
            strictArrayResponse: true,
            position: "cargosArray",
            attributes: ["codigoCargo", "importe"]
          }
        }
      }
    }
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
