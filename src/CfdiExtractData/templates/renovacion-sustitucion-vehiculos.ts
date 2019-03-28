export default ({ minimalData } = {}) => {
	if(minimalData) {
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
