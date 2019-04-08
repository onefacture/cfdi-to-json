import {
    tMinimalData
} from '../index.d';
export default (params: tMinimalData) => {
	if(params.minimalData) {
        return {
            'decreto:renovacionysustitucionvehiculos': {
                position: 'renovacionSustitucionVehiculos',
                attributes: ['version']
            }
        }
    }

    // TODO: Add all nodes
    return {
        'decreto:renovacionysustitucionvehiculos': {
            position: 'renovacionSustitucionVehiculos',
            attributes: ['version', 'tipoDeDecreto']
        }
    };
};
