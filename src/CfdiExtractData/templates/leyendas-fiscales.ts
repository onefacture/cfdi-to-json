import {
    tMinimalData
} from '../index.d';
export default (params: tMinimalData) => {
	if(params.minimalData) {
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
