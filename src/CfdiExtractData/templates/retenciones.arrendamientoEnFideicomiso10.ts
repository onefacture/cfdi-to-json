import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
    "arrendamientoenfideicomiso:Arrendamientoenfideicomiso": {
      position: "arrendamientoEnFideicomiso",
      attributes: ["version"]
    }
};

export const allDataDefinition = {
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

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
