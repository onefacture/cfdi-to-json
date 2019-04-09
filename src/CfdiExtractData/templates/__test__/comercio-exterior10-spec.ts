import comercioExterior10Template from '../comercio-exterior10';
describe('Comercio exterior 10 data test', () => {
    it('Execute with minimalData: false', () => {
        expect(comercioExterior10Template({ minimalData: false })).toEqual({
            'cce:ComercioExterior': {
                position: 'comercioExterior',
                attributes: [
                    'version', 'tipoOperacion', 'claveDePedimento', 'certificadoOrigen',
                    'numCertificadoOrigen', 'numeroExportadorConfiable', 'incoterm',
                    'subDivision', 'observaciones', 'tipoCambioUSD', 'totalUSD'
                ]
            }
        });
    });
    it('Execute with minimalData: true', () => {
        expect(comercioExterior10Template({ minimalData: true })).toEqual({
            'cce:ComercioExterior': {
                position: 'comercioExterior',
                attributes: ['version']
            }
        });
    });
    it('Execute without params', () => {
        expect(comercioExterior10Template()).toEqual({
            'cce:ComercioExterior': {
                position: 'comercioExterior',
                attributes: [
                    'version', 'tipoOperacion', 'claveDePedimento', 'certificadoOrigen',
                    'numCertificadoOrigen', 'numeroExportadorConfiable', 'incoterm',
                    'subDivision', 'observaciones', 'tipoCambioUSD', 'totalUSD'
                ]
            }
        });
    });
})