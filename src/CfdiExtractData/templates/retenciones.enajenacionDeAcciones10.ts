import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "enajenaciondeacciones:EnajenaciondeAcciones": {
        position: "enajenacionDeAcciones",
        attributes: ["version"]
      }
    };
  }

  return {
    "enajenaciondeacciones:EnajenaciondeAcciones": {
      position: "enajenacionDeAcciones",
      attributes: [
        "version",
        "contratoIntermediacion",
        "ganancia",
        "perdida",
      ]
    }
  };
};
