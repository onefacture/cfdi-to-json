import getImpuestosDefinition from './impuestos';
export default ({ minimalData } = {}) => {
	if(minimalData) {
        return {
            'pago10:Pagos': {
                position: 'pagos',
                attributes: ['version']
            }
        }
    }

    let getInnerNodesWithCustomNamespace = namespace => {
        let localNamespace = namespace ? `${namespace}:` : '';
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
                getInnerNodesWithCustomNamespace(),
                getInnerNodesWithCustomNamespace('pago10'),
            )
        }
    }
};
