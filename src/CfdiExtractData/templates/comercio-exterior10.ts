import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "cce:ComercioExterior": {
    position: "comercioExterior",
    attributes: ["version"]
  }
};

// TODO: Add all nodes
export const allDataDefinition = {
  "cce:ComercioExterior": {
    position: "comercioExterior",
    attributes: [
      "version",
      "tipoOperacion",
      "claveDePedimento",
      "certificadoOrigen",
      "numCertificadoOrigen",
      "numeroExportadorConfiable",
      "incoterm",
      "subDivision",
      "observaciones",
      "tipoCambioUSD",
      "totalUSD"
    ]
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
