import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "intereseshipotecarios:Intereseshipotecarios": {
        position: "interesesHipotecarios",
        attributes: ["version"]
      }
    };
  }

  return {
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
};
