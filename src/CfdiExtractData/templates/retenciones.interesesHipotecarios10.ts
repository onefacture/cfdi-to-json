import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "intereseshipotecarios:Intereseshipotecarios": {
    position: "interesesHipotecarios",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "intereseshipotecarios:Intereseshipotecarios": {
    position: "interesesHipotecarios",
    attributes: [
      "version",
      "creditoDeInstFinanc",
      "saldoInsoluto",
      "propDeducDelCredit",
      "montTotIntNominalesDev",
      "montTotIntNominalesDevYPag",
      "montTotIntRealPagDeduc",
      "numContrato",
    ]
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
