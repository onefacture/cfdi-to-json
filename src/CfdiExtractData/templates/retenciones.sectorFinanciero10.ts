import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "sectorfinanciero:SectorFinanciero": {
    position: "sectorFinanciero",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "sectorfinanciero:SectorFinanciero": {
    position: "sectorFinanciero",
    attributes: [
      "version",
      "idFideicom",
      "nomFideicom",
      "descripFideicom",
    ]
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
