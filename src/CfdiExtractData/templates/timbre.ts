import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "tfd:TimbreFiscalDigital": {
        position: "timbreFiscal",
        attributes: ["fechaTimbrado", "uuid"]
      }
    };
  }

  return {
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
    }
  };
};
