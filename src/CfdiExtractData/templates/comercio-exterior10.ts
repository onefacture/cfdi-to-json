export default ({ minimalData } = {}) => {
    if(minimalData) {
        return {
            'cce:ComercioExterior': {
                position: 'comercioExterior',
                attributes: ['version']
            }
        }
    }

    // TODO: Add all nodes
    return {
        'cce:ComercioExterior': {
            position: 'comercioExterior',
            attributes: [
                'version', 'tipoOperacion', 'claveDePedimento', 'certificadoOrigen',
                'numCertificadoOrigen', 'numeroExportadorConfiable', 'incoterm',
                'subDivision', 'observaciones', 'tipoCambioUSD', 'totalUSD'
            ]
        }
    }
};
