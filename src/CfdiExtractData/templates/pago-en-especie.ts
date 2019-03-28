export default ({ minimalData } = {}) => {
	if(minimalData) {
        return {
            'pagoenespecie:PagoEnEspecie': {
                position: 'pagoEnEspecie',
                attributes: ['version']
            }
        }
    }

    return {
        'pagoenespecie:PagoEnEspecie': {
            position: 'pagoEnEspecie',
            attributes: ['version', 'cvePIC', 'folioSolDon', 'pzaArtNombre', 'pzaArtTecn', 'pzaArtAProd', 'pzaArtDim']
        }
    }
};
