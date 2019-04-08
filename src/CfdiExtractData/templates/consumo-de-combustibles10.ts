import {
    tMinimalData
} from '../index.d';
export default (params: tMinimalData) => {
	if(params.minimalData) {
        return {
            'consumodecombustibles:ConsumoDeCombustibles': {
                position: 'consumoDeCombustibles',
                attributes: ['version']
            }
        }
    }

    return {
        'consumodecombustibles:ConsumoDeCombustibles': {
            position: 'consumoDeCombustibles',
            attributes: ['version', 'tipoOperacion', 'numeroDeCuenta', 'subTotal', 'total'],
            nodes: {
                'consumodecombustibles:Conceptos': {
                    nodes: {
                        'consumodecombustibles:ConceptoConsumoDeCombustibles': {
                            strictArrayResponse: true,
                            position: 'conceptos',
                            attributes: [
                                'identificador', 'fecha', 'rfc', 'claveEstacion', 'cantidad',
                                'nombreCombustible', 'folioOperacion', 'valorUnitario', 'importe'
                            ],
                            nodes: {
                                'consumodecombustibles:Determinados': {
                                    nodes: {
                                        'consumodecombustibles:Determinado': {
                                            strictArrayResponse: true,
                                            position: 'determinados',
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
    }
};
