import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "tfd:TimbreFiscalDigital": {
    position: "timbreFiscal",
    attributes: ["fechaTimbrado", "uuid"]
   },
   "TimbreFiscalDigital": {
    position: "timbreFiscal",
    attributes: ["fechaTimbrado", "uuid"]
   }
};

export const allDataDefinition = {
  "tfd:TimbreFiscalDigital": {
    position: "timbreFiscal",
    attributes: [
      "fechaTimbrado",
      "uuid",
      "noCertificadoSAT",
      "selloSAT",
      "selloCFD",
      "RFCProvCertif"
    ]
  },
  "TimbreFiscalDigital": {
    position: "timbreFiscal",
    attributes: [
      "fechaTimbrado",
      "uuid",
      "noCertificadoSAT",
      "selloSAT",
      "selloCFD",
      "RFCProvCertif"
    ]
  }
};


export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
