import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "ecc11:EstadoDeCuentaCombustible": {
    position: "estadoCuentaCombustibles",
    attributes: ["version", "total"]
  }
};

export const allDataDefinition = {
  "ecc11:EstadoDeCuentaCombustible": {
    position: "estadoCuentaCombustibles",
    attributes: [
      "version",
      "tipoOperacion",
      "numeroDeCuenta",
      "subTotal",
      "total"
    ],
    nodes: {
      "ecc11:Conceptos": {
        nodes: {
          "ecc11:ConceptoEstadoDeCuentaCombustible": {
            strictArrayResponse: true,
            position: "conceptos",
            attributes: [
              "identificador",
              "fecha",
              "rfc",
              "claveEstacion",
              "tar",
              "cantidad",
              "noIdentificacion",
              "unidad",
              "nombreCombustible",
              "folioOperacion",
              "valorUnitario",
              "importe"
            ],
            nodes: {
              "ecc11:Traslados": {
                nodes: {
                  "ecc11:Traslado": {
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
