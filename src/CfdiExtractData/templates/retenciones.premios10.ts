import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "premios:Premios": {
        position: "premios",
        attributes: ["version"]
      }
    };
  }

  return {
    "premios:Premios": {
      position: "premios",
      attributes: [
        "version",
        "entidadFederativa",
        "montTotPago",
        "montTotPagoGrav",
        "montTotPagoExent",
      ]
    }
  };
};
