import {
    tMinimalData
} from '../index.d';
export default (params?: tMinimalData) => {
    if(params && params.minimalData) {
        return {
            'cce11:ComercioExterior': {
                position: 'comercioExterior',
                attributes: ['version']
            }
        }
    }

    // TODO: Add all nodes
    return {
        'cce11:ComercioExterior': {
            position: 'comercioExterior',
            attributes: [
                'version', 'motivoTraslado', 'tipoOperacion', 'claveDePedimento', 'certificadoOrigen',
                'numCertificadoOrigen', 'numeroExportadorConfiable', 'incoterm',
                'subDivision', 'observaciones', 'tipoCambioUSD', 'totalUSD'
            ]
        }
    }
};
