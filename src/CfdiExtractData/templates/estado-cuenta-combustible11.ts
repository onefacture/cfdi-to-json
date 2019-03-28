export default ({ minimalData } = {}) => {
	if(minimalData) {
        return {
            'ecc11:EstadoDeCuentaCombustible': {
                position: 'estadoCuentaCombustibles',
                attributes: ['version', 'total']
            }
        }
    }

    return {
        'ecc11:EstadoDeCuentaCombustible': {
            position: 'estadoCuentaCombustibles',
            attributes: ['version', 'tipoOperacion', 'numeroDeCuenta', 'subTotal', 'total'],
            nodes: {
                'ecc11:Conceptos': {
                    strictArrayResponse: true,
                    position: 'conceptos',
                    nodes: {
                        'ecc11:ConceptoEstadoDeCuentaCombustible': {
                            attributes: [
                                'identificador', 'fecha', 'rfc', 'claveEstacion', 'tar', 'cantidad', 'noIdentificacion',
                                'unidad', 'nombreCombustible', 'folioOperacion', 'valorUnitario', 'importe'
                            ],
                            nodes: {
                                'ecc11:Traslados': {
                                    nodes: {
                                        'ecc11:Traslado': {
                                            strictArrayResponse: true,
                                            position: 'traslados',
                                            attributes: ['impuesto', 'tasaOCuota', 'importe'],
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
};
