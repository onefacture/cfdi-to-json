import getImpuestosDefinition from "./impuestos";
import { tMinimalData } from "../index.d";

export function __getInnerNodes() {
  return {
    'Pago': {
      position: "arrayPagos",
      strictArrayResponse: true,
      attributes: [
        "fechaPago",
        "formaDePagoP",
        "monedaP",
        "tipoCambioP",
        "monto",
        "numOperacion",
        "rfcEmisorCtaOrd",
        "nomBancoOrdExt",
        "ctaOrdenante",
        "rfcEmisorCtaBen",
        "ctaBeneficiario",
        "tipoCadPago",
        "certPago",
        "cadPago",
        "selloPago"
      ],
      nodes: {
        'DoctoRelacionado': {
          strictArrayResponse: true,
          position: "docsRelacionados",
          attributes: [
            "idDocumento",
            "serie",
            "folio",
            "monedaDR",
            "tipoCambioDR",
            "metodoDePagoDR",
            "numParcialidad",
            "impSaldoAnt",
            "impPagado",
            "impSaldoInsoluto"
          ]
        },
        'Impuestos': getImpuestosDefinition()
      }
    }
  };
}

const minimalDataPagos = {
  position: "pagos",
  attributes: ["version"]
};

const allDataPagos = {
  position: "pagos",
  attributes: ["version"],
  nodes: Object.assign(
    __getInnerNodes(),
  )
};

export const minimalDataDefinition = {
  "Pagos": minimalDataPagos,
};

export const allDataDefinition = {
  "Pagos": allDataPagos,
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
