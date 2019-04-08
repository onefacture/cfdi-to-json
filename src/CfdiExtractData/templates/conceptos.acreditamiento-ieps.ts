import {
    tMinimalData
} from '../index.d';
export default (params: tMinimalData) => {
	return {
        'aieps:acreditamientoIEPS': {
            postion: 'acreditamientoIEPS',
            attributes: ['version', 'tar']
        }
    };
};
