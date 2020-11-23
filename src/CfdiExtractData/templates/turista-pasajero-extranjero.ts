import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "tpe:TuristaPasajeroExtranjero": {
    position: "turistaPasajeroExtranjero",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "tpe:TuristaPasajeroExtranjero": {
    position: "turistaPasajeroExtranjero",
    attributes: ["version", "fechadeTransito", "tipoTransito"],
    nodes: {
      "tpe:datosTransito": {
        position: "datosTransito",
        attributes: [
          "via",
          "tipoId",
          "numeroId",
          "nacionalidad",
          "empresaTransporte",
          "idTransporte"
        ]
      }
    }
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
