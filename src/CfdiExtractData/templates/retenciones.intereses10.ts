import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "intereses:Intereses": {
    position: "intereses",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
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

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
