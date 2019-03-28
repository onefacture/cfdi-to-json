export default ({ minimalData } = {}) => {
	if(minimalData) {
        return {
            'leyendasFisc:LeyendasFiscales': {
                position: 'leyendasFiscales',
                attributes: ['version']
            }
        }
    }

    return {
        'leyendasFisc:LeyendasFiscales': {
            position: 'leyendasFiscales',
            attributes: ['version'],
            nodes: {
                'leyendasFisc:Leyenda': {
                    strictArrayResponse: true,
                    position: 'leyendasArray',
                    attributes: ['disposicionFiscal', 'norma', 'textoLeyenda'],
                }
            }
        }
    }
};
