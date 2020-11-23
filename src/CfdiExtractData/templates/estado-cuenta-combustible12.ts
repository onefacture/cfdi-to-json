import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "ecc12:EstadoDeCuentaCombustible": {
    position: "estadoCuentaCombustibles",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "ecc12:EstadoDeCuentaCombustible": {
    position: "estadoCuentaCombustibles",
    attributes: [
      "version",
      "tipoOperacion",
      "numeroDeCuenta",
      "subTotal",
      "total"
    ],
    nodes: {
      "ecc12:Conceptos": {
        strictArrayResponse: true,
        position: "conceptos",
        nodes: {
          "ecc12:ConceptoEstadoDeCuentaCombustible": {
            attributes: [
              "identificador",
              "fecha",
              "rfc",
              "claveEstacion",
              "cantidad",
              "tipoCombustible",
              "unidad",
              "nombreCombustible",
              "folioOperacion",
              "valorUnitario",
              "importe"
            ],
            nodes: {
              "ecc12:Traslados": {
                nodes: {
                  "ecc12:Traslado": {
                    strictArrayResponse: true,
                    position: "traslados",
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
