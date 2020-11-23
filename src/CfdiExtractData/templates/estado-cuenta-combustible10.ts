import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "ecc:EstadoDeCuentaCombustible": {
    position: "estadoCuentaCombustibles",
    attributes: ["subTotal", "total"]
  }
};

export const allDataDefinition = {
  "ecc:EstadoDeCuentaCombustible": {
    position: "estadoCuentaCombustibles",
    attributes: ["tipoOperacion", "numeroDeCuenta", "subTotal", "total"],
    nodes: {
      "ecc:Conceptos": {
        strictArrayResponse: true,
        position: "conceptos",
        nodes: {
          "ecc:ConceptoEstadoDeCuentaCombustible": {
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
              "ecc:Traslados": {
                nodes: {
                  "ecc:Traslado": {
                    strictArrayResponse: true,
                    position: "traslados",
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
