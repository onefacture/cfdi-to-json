import {
    tMinimalData
} from '../index.d';
export default (params: tMinimalData) => {
	if(params.minimalData) {
        return {
            'terceros:PorCuentadeTerceros': {
                position: 'cuentaTerceros',
                attributes: ['version']
            }
        };
    }

    const informacionAduaneraDefinition = {
        'terceros:InformacionAduanera': {
            position: 'informacionAduanera',
            attributes: ['numero', 'fecha', 'aduana']
        },
    };

    return {
        'terceros:PorCuentadeTerceros': {
            position: 'cuentaTerceros',
            attributes: ['version', 'rfc', 'nombre'],
            nodes: Object.assign({}, informacionAduaneraDefinition, {
                'terceros:Parte': {
                    strictArrayResponse: true,
                    position: 'partes',
                    attributes: ['cantidad', 'unidad', 'noIdentificacion', 'descripcion', 'valorUnitario', 'importe'],
                    nodes: informacionAduaneraDefinition,
                },
                'terceros:CuentaPredial': {
                    position: 'cuentaPredial',
                    attributes: ['numero'],
                }
            })
        }
    }
};
