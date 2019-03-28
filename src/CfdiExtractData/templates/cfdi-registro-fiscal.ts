export default ({ minimalData } = {}) => {
	if(minimalData) {
        return {
            'registrofiscal:CFDIRegistroFiscal': {
                position: 'cfdiRegistroFiscal',
                attributes: ['version']
            }
        }
    }

    return {
        'registrofiscal:CFDIRegistroFiscal': {
            position: 'cfdiRegistroFiscal',
            attributes: ['version', 'folio']
        }
    }
};
