import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "consumodecombustibles:ConsumoDeCombustibles": {
    position: "consumoDeCombustibles",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "consumodecombustibles:ConsumoDeCombustibles": {
    position: "consumoDeCombustibles",
    attributes: [
      "version",
      "tipoOperacion",
      "numeroDeCuenta",
      "subTotal",
      "total"
    ],
    nodes: {
      "consumodecombustibles:Conceptos": {
        nodes: {
          "consumodecombustibles:ConceptoConsumoDeCombustibles": {
            strictArrayResponse: true,
            position: "conceptos",
            attributes: [
              "identificador",
              "fecha",
              "rfc",
              "claveEstacion",
              "cantidad",
              "nombreCombustible",
              "folioOperacion",
              "valorUnitario",
              "importe"
            ],
            nodes: {
              "consumodecombustibles:Determinados": {
                nodes: {
                  "consumodecombustibles:Determinado": {
                    strictArrayResponse: true,
                    position: "determinados",
                    attributes: ["impuesto", "tasa", "importe"]
                  }
                }
              }
            }
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
