import pagosTemplate from '../pagos';
describe('Pagos data test', () => {
    it('Execute without params', () => {
        expect(pagosTemplate()).toEqual({

        })
    });
    it('Execute with minimalData: False', () => {
        expect(pagosTemplate({ minimalData: false })).toEqual({

        })
    });
    it('Execute with minimalData: True', () => {
        expect(pagosTemplate({ minimalData: true })).toEqual({
            "pago10:Pagos": {
                position: "pagos",
                attributes: ["version"]
              }
        })
    });
});