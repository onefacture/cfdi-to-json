import getImpuestosDefinition from "./impuestos";
import { tMinimalData } from "../index.d";

export function __getInnerNodes() {
  return {
    'Totales': {
      position: 'totales',
      attributes: [
        'totalRetencionesIVA', 'totalRetencionesISR', 'totalRetencionesIEPS',
        'totalTrasladosBaseIVA16', 'totalTrasladosImpuestoIVA16', 'totalTrasladosBaseIVA8',
        'totalTrasladosImpuestoIVA8', 'totalTrasladosBaseIVA0', 'totalTrasladosImpuestoIVA0',
        'totalTrasladosBaseIVAExento', 'montoTotalPagos'
      ]
    },
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
            'EquivalenciaDR',
            "tipoCambioDR",
            "metodoDePagoDR",
            "numParcialidad",
            "impSaldoAnt",
            "impPagado",
            "impSaldoInsoluto",
            'objetoImpDR',
          ],
          nodes: {
          'ImpuestosDR': {
            position: 'impuestos',
            nodes: {
              'RetencionesDR': {
                nodes: {
                  'RetencionDR': {
                    position: 'retenciones',
                    strictArrayResponse: true,
                    attributes: [
                      'baseDR', 'impuestoDR', 'tipoFactorDR', 'tasaOCuotaDR', 'importeDR'
                    ]
                  },
                }
              },
              'TrasladosDR': {
                nodes: {
                  'TrasladoDR': {
                    position: 'traslados',
                    strictArrayResponse: true,
                    attributes: [
                      'baseDR', 'impuestoDR', 'tipoFactorDR', 'tasaOCuotaDR', 'importeDR'
                    ]
                  },
                },
              },
            },
          },
          }
        },
        'Impuestos': getImpuestosDefinition(),
        'ImpuestosP': {
          nodes: {
            'RetencionesP': {
              nodes: {
                'RetencionP': {
                  position: 'retenciones',
                  strictArrayResponse: true,
                  attributes: [ 'impuestoP', 'importeP' ]
                }
              }
            },
            'TrasladosP': {
              nodes: {
                'TrasladoP': {
                  position: 'traslados',
                  strictArrayResponse: true,
                  attributes: [
                    'baseP', 'impuestoP', 'tipoFactorP', 'tasaOCuotaP', 'importeP'
                  ]
                }
              }
            }
          }
        }
      },
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
