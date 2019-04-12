import impuestosTemplate from '../impuestos';
describe('Impuestos data test', () => {
    it('Execute without params', () => {
        expect(impuestosTemplate()).toEqual({

        })
    });
    it('Execute with minimalData: False', () => {
        expect(impuestosTemplate({ minimalData: false })).toEqual({

        })
    });
    it('Execute with minimalData: True', () => {
        expect(impuestosTemplate({ minimalData: true })).toEqual({

        })
    });
});