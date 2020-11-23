import getImpuestosDefinition from "./impuestos";
import { tMinimalData, tNamespace } from "../index.d";

export function __getInnerNodesWithCustomNamespace(params?: tNamespace) {
  let localNamespace = params && params.namespace ? `${params.namespace}:` : "";
  return {
    [`${localNamespace}Pago`]: {
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
        [`${localNamespace}DoctoRelacionado`]: {
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
        [`${localNamespace}Impuestos`]: getImpuestosDefinition({
          namespace: localNamespace
        })
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
    __getInnerNodesWithCustomNamespace(),
    __getInnerNodesWithCustomNamespace({ namespace: "pago10" })
  )
};

export const minimalDataDefinition = {
  "pago10:Pagos": minimalDataPagos,
  "Pagos": minimalDataPagos,
};

export const allDataDefinition = {
  "pago10:Pagos": allDataPagos,
  "Pagos": allDataPagos,
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
