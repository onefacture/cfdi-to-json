import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "ine:INE": {
        position: "ine",
        attributes: ["version"]
      }
    };
  }

  return {
    "ine:INE": {
      position: "ine",
      attributes: ["version", "tipoProceso", "tipoComite", "idContabilidad"]
    }
  };
};
