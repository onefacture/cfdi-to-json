import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "arrendamientoenfideicomiso:Arrendamientoenfideicomiso": {
        position: "arrendamientoEnFideicomiso",
        attributes: ["version"]
      }
    };
  }

  return {
    "arrendamientoenfideicomiso:Arrendamientoenfideicomiso": {
      position: "arrendamientoEnFideicomiso",
      attributes: [
        "version",
        "pagProvEfecPorFiduc",
        "rendimFideicom",
        "deduccCorresp",
        "montTotRet",
        "montResFiscDistFibras",
        "montOtrosConceptDistr",
        "descrMontOtrosConceptDistr",
      ]
    }
  };
};
