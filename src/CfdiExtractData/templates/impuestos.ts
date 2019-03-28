export default ({ namespace } = {}) => {
	return {
        position:   'impuestos',
        attributes: ['totalImpuestosRetenidos', 'totalImpuestosTrasladados'],
        nodes: {
            [`${namespace ? namespace + ':' : ''}Traslados`]: {
                nodes: {
                    [`${namespace ? namespace + ':' : ''}Traslado`]: {
                        position: 'traslados',
                        strictArrayResponse: true,
                        // Aplica tasa para cfdi v3.2
                        attributes: ['impuesto', 'tipoFactor', 'tasaOCuota', 'importe', 'tasa']
                    }
                }
            },
            [`${namespace ? namespace + ':' : ''}Retenciones`]: {
                nodes: {
                    [`${namespace ? namespace + ':' : ''}Retencion`]: {
                        position: 'retenciones',
                        strictArrayResponse: true,
                        attributes: ['impuesto', 'importe']
                    }
                }
            }
        }
    }
};
