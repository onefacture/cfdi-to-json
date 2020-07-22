import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "dividendos:Dividendos": {
        position: "dividendos",
        attributes: ["version"]
      }
    };
  }

  return {
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
};
