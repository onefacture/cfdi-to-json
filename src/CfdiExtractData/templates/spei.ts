import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "spei:Complemento_SPEI": {
    position: "spei",
    nodes: {
      "spei:SPEI_Tercero": {
        strictArrayResponse: true,
        position: "speiTerceroArray",
        attributes: [
          "fechaOperacion",
          "hora",
          "claveSPEI",
          "sello",
          "numeroCertificado",
          "cadenaCDA"
        ],
        nodes: {
          "spei:Ordenante": {
            position: "ordenante",
            attributes: [
              "bancoEmisor",
              "nombre",
              "tipoCuenta",
              "cuenta",
              "rfc"
            ]
          },
          "spei:Beneficiario": {
            position: "benerificario",
            attributes: [
              "bancoReceptor",
              "nombre",
              "tipoCuenta",
              "cuenta",
              "rfc",
              "concepto",
              "iva",
              "montoPago"
            ]
          }
        }
      }
    }
  }
};

export const allDataDefinition = minimalDataDefinition;

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
