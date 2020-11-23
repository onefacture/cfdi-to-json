import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "pagosaextranjeros:Pagosaextranjeros": {
    position: "pagosAExtranjeros",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "pagosaextranjeros:Pagosaextranjeros": {
    position: "pagosAExtranjeros",
    attributes: [ "version", "esBenefEfectDelCobro" ],
    nodes: {
      "pagosaextranjeros:NoBeneficiario": {
        strictArrayResponse: true,
        position: "noBeneficiarios",
        attributes: [
          "paisDeResidParaEfecFisc",
          "conceptoPago",
          "descripcionConcepto",
        ],
      },
      "pagosaextranjeros:Beneficiario": {
        strictArrayResponse: true,
        position: "beneficiarios",
        attributes: [
          "rfc",
          "curp",
          "nomDenRazSocB",
          "conceptoPago",
          "descripcionConcepto",
        ],
      },
    }
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
