export default ({ minimalData } = {}) => {
	return {
        'iedu:instEducativas': {
            position: 'instEducativa',
            attributes: ['version', 'nombreAlumno', 'curp', 'nivelEducativo', 'autRVOE', 'rfcPago']
        }
    }
};
