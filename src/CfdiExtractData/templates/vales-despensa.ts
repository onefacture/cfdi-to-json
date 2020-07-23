import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "valesdedespensa:ValesDeDespensa": {
    position: "valesDeDespensa",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "valesdedespensa:ValesDeDespensa": {
    position: "valesDeDespensa",
    attributes: [
      "version",
      "tipoOperacion",
      "registroPatronal",
      "numeroDeCuenta",
      "total"
    ],
    nodes: {
      "valesdedespensa:Conceptos": {
        nodes: {
          "valesdedespensa:Concepto": {
            strictArrayResponse: true,
            position: "conceptos",
            attributes: [
              "identificador",
              "fecha",
              "rfc",
              "curp",
              "nombre",
              "numSeguridadSocial",
              "importe"
            ]
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
