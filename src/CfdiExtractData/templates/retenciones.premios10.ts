import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "premios:Premios": {
    position: "premios",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
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

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
