import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "operacionesconderivados:Operacionesconderivados": {
    position: "operacionesConDerivados",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "operacionesconderivados:Operacionesconderivados": {
    position: "operacionesConDerivados",
    attributes: [
      "version",
      "montGanAcum",
      "montPerdDed",
    ]
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
