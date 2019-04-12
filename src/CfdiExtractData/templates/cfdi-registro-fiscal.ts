import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "registrofiscal:CFDIRegistroFiscal": {
        position: "cfdiRegistroFiscal",
        attributes: ["version"]
      }
    };
  }

  return {
    "registrofiscal:CFDIRegistroFiscal": {
      position: "cfdiRegistroFiscal",
      attributes: ["version", "folio"]
    }
  };
};
