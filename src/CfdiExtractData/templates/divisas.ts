export default ({ minimalData } = {}) => {
	if(minimalData) {
        return {
            'divisas:Divisas': {
                position: 'divisas',
                attributes: ['version']
            }
        }
    }

    return {
        'divisas:Divisas': {
            position: 'divisas',
            attributes: ['version', 'tipoOperacion'],
        }
    };
};
