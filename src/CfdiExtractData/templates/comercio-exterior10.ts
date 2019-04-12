import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "cce:ComercioExterior": {
        position: "comercioExterior",
        attributes: ["version"]
      }
    };
  }

  // TODO: Add all nodes
  return {
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
};
