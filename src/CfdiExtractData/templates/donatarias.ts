import {
    tMinimalData
} from '../index.d';
export default (params: tMinimalData) => {
	if(params.minimalData) {
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
