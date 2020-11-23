import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "registrofiscal:CFDIRegistroFiscal": {
    position: "cfdiRegistroFiscal",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "registrofiscal:CFDIRegistroFiscal": {
    position: "cfdiRegistroFiscal",
    attributes: ["version", "folio"]
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
