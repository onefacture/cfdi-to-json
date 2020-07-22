import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "operacionesconderivados:Operacionesconderivados": {
        position: "operacionesConDerivados",
        attributes: ["version"]
      }
    };
  }

  return {
    "operacionesconderivados:Operacionesconderivados": {
      position: "operacionesConDerivados",
      attributes: [
        "version",
        "montGanAcum",
        "montPerdDed",
      ]
    }
  };
};
