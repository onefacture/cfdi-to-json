import comercioExterior11Template from '../comercio-exterior11';
describe('Comercio exterior 11 data test', () => {
    it('Excecute with minimalData: false', () => {
        expect(comercioExterior11Template({ minimalData: false })).toEqual({
            'cce11:ComercioExterior': {
                position: 'comercioExterior',
                attributes: [
                    'version', 'motivoTraslado', 'tipoOperacion', 'claveDePedimento', 'certificadoOrigen',
                    'numCertificadoOrigen', 'numeroExportadorConfiable', 'incoterm',
                    'subDivision', 'observaciones', 'tipoCambioUSD', 'totalUSD'
                ]
            }
        });
    });
    it('Excecute with minimalData: true', () => {
        expect(comercioExterior11Template({ minimalData: true })).toEqual({
            'cce11:ComercioExterior': {
                position: 'comercioExterior',
                attributes: ['version']
            }
        });
    });
    it('Excecute without params', () => {
        expect(comercioExterior11Template()).toEqual({
            'cce11:ComercioExterior': {
                position: 'comercioExterior',
                attributes: [
                    'version', 'motivoTraslado', 'tipoOperacion', 'claveDePedimento', 'certificadoOrigen',
                    'numCertificadoOrigen', 'numeroExportadorConfiable', 'incoterm',
                    'subDivision', 'observaciones', 'tipoCambioUSD', 'totalUSD'
                ]
            }
        });
    });
});