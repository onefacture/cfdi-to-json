import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "consumodecombustibles11:ConsumoDeCombustibles": {
    position: "consumoDeCombustibles",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "consumodecombustibles11:ConsumoDeCombustibles": {
    position: "consumoDeCombustibles",
    attributes: [
      "version",
      "tipoOperacion",
      "numeroDeCuenta",
      "subTotal",
      "total"
    ],
    nodes: {
      "consumodecombustibles11:Conceptos": {
        nodes: {
          "consumodecombustibles11:ConceptoConsumoDeCombustibles": {
            strictArrayResponse: true,
            position: "conceptos",
            attributes: [
              "identificador",
              "fecha",
              "rfc",
              "claveEstacion",
              "tipoCombustible",
              "cantidad",
              "nombreCombustible",
              "folioOperacion",
              "valorUnitario",
              "importe"
            ],
            nodes: {
              "consumodecombustibles11:Determinados": {
                nodes: {
                  "consumodecombustibles11:Determinado": {
                    strictArrayResponse: true,
                    position: "determinados",
                    attributes: ["impuesto", "tasaOCuota", "importe"]
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
