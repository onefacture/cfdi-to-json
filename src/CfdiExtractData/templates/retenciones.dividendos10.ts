import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
    "dividendos:Dividendos": {
      position: "dividendos",
      attributes: ["version"]
    }
};

export const allDataDefinition = {
  "dividendos:Dividendos": {
    position: "dividendos",
    attributes: [ "version" ],
    nodes: {
      "dividendos:DividOUtil": {
        strictArrayResponse: true,
        position: "arrayDividOUtil",
        attributes: [
          "cveTipDivOUtil",
          "montISRAcredRetMexico",
          "montISRAcredRetExtranjero",
          "montRetExtDivExt",
          "tipoSocDistrDiv",
          "montISRAcredNal",
          "montDivAcumNal",
          "montDivAcumExt",
        ]
      },
      "dividendos:Remanente": {
        strictArrayResponse: true,
        position: "arrayRemanentes",
        attributes: [
          "proporcionRem"
        ]
      },
    }
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
