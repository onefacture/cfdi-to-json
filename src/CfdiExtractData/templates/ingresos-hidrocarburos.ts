import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "IngresosHidrocarburos": {
    position: "ingresosHidrocarburos",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "IngresosHidrocarburos": {
    position: "ingresosHidrocarburos",
    attributes: ["version", "numeroContrato", "contraprestacionPagadaOperador", "porcentaje"],
    nodes: {
      "DocumentoRelacionado": {
        position: "otrosCargos",
        attributes: ["totalCargos"],
      }
    }
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
