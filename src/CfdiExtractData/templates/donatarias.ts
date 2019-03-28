export default ({ minimalData } = {}) => {
	if(minimalData) {
        return {
            'donat:Donatarias': {
                position: 'donatarias',
                attributes: ['version']
            }
        }
    }

    return {
        'donat:Donatarias': {
            position: 'donatarias',
            attributes: ['version', 'noAutorizacion', 'fechaAutorizacion', 'leyenda'],
        }
    };
};
