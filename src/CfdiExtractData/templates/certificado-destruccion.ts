import {
    tMinimalData
} from '../index.d';
export default (params: tMinimalData) => {
	return {
        'destruccion:certificadodedestruccion': {
            position: 'certificadoDestruccion',
            attributes: ['version', 'serie', 'numFolDesVeh']
        }
    }
};
