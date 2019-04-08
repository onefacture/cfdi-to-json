import {
    tMinimalData
} from '../index.d';
export default (params: tMinimalData) => {
	if(params.minimalData) {
        return {
            'servicioparcial:parcialesconstruccion': {
                position: 'servicioParcial',
                attributes: ['version']
            }
        }
    }

    return {
        'servicioparcial:parcialesconstruccion': {
            position: 'servicioParcial',
            attributes: ['version', 'numPerLicoAut'],
            nodes: {
                'servicioparcial:Inmueble': {
                    attributes: [
                        'calle', 'noExterior', 'noInterior', 'colonia', 'localidad',
                        'referencia', 'municipio', 'estado', 'codigoPostal'
                    ]
                }
            }
        }
    }
};
