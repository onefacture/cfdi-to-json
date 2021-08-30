import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
   "TimbreFiscalDigital": {
    position: "timbreFiscal",
    attributes: ["fechaTimbrado", "uuid"]
   }
};

export const allDataDefinition = {
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
