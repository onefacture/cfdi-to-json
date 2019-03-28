export default ({ minimalData } = {}) => {
	if(minimalData) {
        return {
            'implocal:ImpuestosLocales': {
                position: 'impuestosLocales',
                attributes: ['totalDeRetenciones', 'totalDeTraslados']
            }
        }
    }

    return {
        'implocal:ImpuestosLocales': {
            position: 'impuestosLocales',
            attributes: ['totalDeRetenciones', 'totalDeTraslados'],
            nodes: {
                'implocal:RetencionesLocales': {
                    strictArrayResponse: true,
                    position: 'retencionesLocales',
                    attributes: ['impLocRetenido', 'tasaDeRetencion', 'importe'],
                },
                'implocal:TrasladosLocales': {
                    strictArrayResponse: true,
                    position: 'trasladosLocales',
                    attributes: ['impLocTrasladado', 'tasaDeTraslado', 'importe'],
                },
            }
        }
    }
};
