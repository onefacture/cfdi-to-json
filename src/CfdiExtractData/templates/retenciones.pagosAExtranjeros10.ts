import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "pagosaextranjeros:Pagosaextranjeros": {
        position: "pagosAExtranjeros",
        attributes: ["version"]
      }
    };
  }

  return {
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
};
