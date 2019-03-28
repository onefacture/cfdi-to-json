export default ({ minimalData } = {}) => {
	if(minimalData) {
        return {
            'aerolineas:Aerolineas': {
                position: 'aerolineas',
                attributes: ['version']
            }
        }
    }

    return {
        'aerolineas:Aerolineas': {
            position: 'aerolineas',
            attributes: ['version', 'tua'],
            nodes: {
                'aerolineas:OtrosCargos': {
                    position: 'otrosCargos',
                    attributes: ['totalCargos'],
                    nodes: {
                        'aerolineas:Cargo': {
                            strictArrayResponse: true,
                            position: 'cargosArray',
                            attributes: ['codigoCargo', 'importe']
                        }
                    }
                }
            }
        }
    }
};
