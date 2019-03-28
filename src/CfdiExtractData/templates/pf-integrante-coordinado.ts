export default ({ minimalData } = {}) => {
	if(minimalData) {
        return {
            'pfic:PFintegranteCoordinado': {
                position: 'pfIntegranteCoordinado',
                attributes: ['version']
            }
        }
    }

    return {
        'pfic:PFintegranteCoordinado': {
            position: 'pfIntegranteCoordinado',
            attributes: ['version', 'claveVehicular', 'placa', 'RFCPF']
        }
    }
};
