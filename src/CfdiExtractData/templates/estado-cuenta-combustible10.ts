import {
    tMinimalData
} from '../index.d';
export default (params: tMinimalData) => {
	if(params.minimalData) {
        return {
            'ecc:EstadoDeCuentaCombustible': {
                position: 'estadoCuentaCombustibles',
                attributes: ['subTotal', 'total']
            }
        }
    }

    return {
        'ecc:EstadoDeCuentaCombustible': {
            position: 'estadoCuentaCombustibles',
            attributes: ['tipoOperacion', 'numeroDeCuenta', 'subTotal', 'total'],
            nodes: {
                'ecc:Conceptos': {
                    strictArrayResponse: true,
                    position: 'conceptos',
                    nodes: {
                        'ecc:ConceptoEstadoDeCuentaCombustible': {
                            attributes: [
                                'identificador', 'fecha', 'rfc', 'claveEstacion', 'cantidad',
                                'nombreCombustible', 'folioOperacion', 'valorUnitario', 'importe'
                            ],
                            nodes: {
                                'ecc:Traslados': {
                                    nodes: {
                                        'ecc:Traslado': {
                                            strictArrayResponse: true,
                                            position: 'traslados',
                                            attributes: ['impuesto', 'tasa', 'importe'],
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
