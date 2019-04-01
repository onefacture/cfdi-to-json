export default (params?: { minimalData: boolean }) => {
	if(params && params.minimalData) {
        return {
            'aerolineas:Aerolineas': {
                position: 'aerolineas',
                attributes: ['version']
            }
        };
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
    };
};
