import {
    tMinimalData
} from '../index.d';
export default (params: tMinimalData) => {
	if(params.minimalData) {
        return {
            'valesdedespensa:ValesDeDespensa': {
                position: 'valesDeDespensa',
                attributes: ['version']
            }
        }
    }

    return {
        'valesdedespensa:ValesDeDespensa': {
            position: 'valesDeDespensa',
            attributes: ['version', 'tipoOperacion', 'registroPatronal', 'numeroDeCuenta', 'total'],
            nodes: {
                'valesdedespensa:Conceptos': {
                    nodes: {
                        'valesdedespensa:Concepto': {
                            strictArrayResponse: true,
                            position: 'conceptos',
                            attributes: ['identificador', 'fecha', 'rfc', 'curp', 'nombre', 'numSeguridadSocial', 'importe']
                        }
                    }
                }
            }
        }
    }
};
