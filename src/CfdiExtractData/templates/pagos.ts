import getImpuestosDefinition from './impuestos';
import {
    tMinimalData, tNamespace
} from '../index.d';
export default (params: tMinimalData) => {
	if(params.minimalData) {
        return {
            'pago10:Pagos': {
                position: 'pagos',
                attributes: ['version']
            }
        }
    }

    let getInnerNodesWithCustomNamespace = (params: tNamespace) => {
        let localNamespace = params.namespace ? `${params.namespace}:` : '';
        return {
            [`${localNamespace}Pago`]: {
                position: 'arrayPagos',
                strictArrayResponse: true,
                attributes: [
                    'fechaPago', 'formaDePagoP', 'monedaP', 'tipoCambioP', 'monto', 'numOperacion',
                    'rfcEmisorCtaOrd', 'nomBancoOrdExt', 'ctaOrdenante', 'rfcEmisorCtaBen',
                    'ctaBeneficiario', 'tipoCadPago', 'certPago', 'cadPago','selloPago'
                ],
                nodes: {
                    [`${localNamespace}DoctoRelacionado`]: {
                        strictArrayResponse: true,
                        position: 'docsRelacionados',
                        attributes: [
                            'idDocumento', 'serie', 'folio', 'monedaDR', 'tipoCambioDR', 'metodoDePagoDR',
                            'numParcialidad', 'impSaldoAnt', 'impPagado', 'impSaldoInsoluto'
                        ],
                    },
                    [`${localNamespace}Impuestos`]: getImpuestosDefinition({
                        namespace: localNamespace
                    }),
                }
            }
        }
    }

    return {
        'pago10:Pagos': {
            position: 'pagos',
            attributes: ['version'],
            nodes: Object.assign(
                getInnerNodesWithCustomNamespace({}),
                getInnerNodesWithCustomNamespace({namespace: 'pago10'}),
            )
        }
    }
};
