export default ({ minimalData } = {}) => {
	if(minimalData) {
        return {
            'obrasarte:obrasarteantiguedades': {
                position: 'obrasarteAntiguedades',
                attributes: ['version']
            }
        }
    }

    // TODO: Revisar si CaracterísticasDeObraoPieza lleva o no acento!!!!
    return {
        'obrasarte:obrasarteantiguedades': {
            position: 'obrasarteAntiguedades',
            attributes: [
                'version', 'tipoBien', 'otrosTipoBien', 'tituloAdquirido', 'otrosTituloAdquirido',
                'subTotal', 'iva', 'fechaAdquisicion', 'caracteristicasDeObraoPieza'
            ]
        }
    }
};
