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

export default (params?: tMinimalData) => {
  let dataPagos = null;
  if (params && params.minimalData) {
    dataPagos = {
      position: "pagos",
      attributes: ["version"]
    };

    return {
      "pago10:Pagos": dataPagos,
      "Pagos": dataPagos,
    };
  }

  dataPagos = {
    position: "pagos",
    attributes: ["version"],
    nodes: Object.assign(
      __getInnerNodesWithCustomNamespace(),
      __getInnerNodesWithCustomNamespace({ namespace: "pago10" })
    )
  };

  return {
    "pago10:Pagos": dataPagos,
    "Pagos": dataPagos,
  };
};
