import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "sectorfinanciero:SectorFinanciero": {
        position: "sectorFinanciero",
        attributes: ["version"]
      }
    };
  }

  return {
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
};
