import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "pagoenespecie:PagoEnEspecie": {
    position: "pagoEnEspecie",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "pagoenespecie:PagoEnEspecie": {
    position: "pagoEnEspecie",
    attributes: [
      "version",
      "cvePIC",
      "folioSolDon",
      "pzaArtNombre",
      "pzaArtTecn",
      "pzaArtAProd",
      "pzaArtDim"
    ]
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
