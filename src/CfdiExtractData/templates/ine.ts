export default ({ minimalData } = {}) => {
	if(minimalData) {
        return {
            'ine:INE': {
                position: 'ine',
                attributes: ['version']
            }
        };
    }

    return {
        'ine:INE': {
            position: 'ine',
            attributes: ['version', 'tipoProceso', 'tipoComite', 'idContabilidad']
        }
    };
};
