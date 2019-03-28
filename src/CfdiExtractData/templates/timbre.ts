export default ({ minimalData } = {}) => {
	if(minimalData) {
        return {
            'tfd:TimbreFiscalDigital': {
                attributes: ['fechaTimbrado','uuid']
            }
        }
    }

    return {
        'tfd:TimbreFiscalDigital': {
            attributes: ['fechaTimbrado','uuid','noCertificadoSAT','selloSAT','selloCFD', 'RFCProvCertif']
        }
    }
};
