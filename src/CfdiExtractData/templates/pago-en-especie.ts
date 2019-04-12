import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "pagoenespecie:PagoEnEspecie": {
        position: "pagoEnEspecie",
        attributes: ["version"]
      }
    };
  }

  return {
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
};
