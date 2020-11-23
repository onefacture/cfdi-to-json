import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "cce11:ComercioExterior": {
    position: "comercioExterior",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "cce11:ComercioExterior": {
    position: "comercioExterior",
    attributes: [
      "version",
      "motivoTraslado",
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
