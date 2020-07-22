import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "intereses:Intereses": {
        position: "intereses",
        attributes: ["version"]
      }
    };
  }

  return {
    "intereses:Intereses": {
      position: "intereses",
      attributes: [
        "version",
        "sistFinanciero",
        "retiroAORESRetInt",
        "operFinancDerivad",
        "montIntNominal",
        "montIntReal",
        "perdida",
      ]
    }
  };
};
