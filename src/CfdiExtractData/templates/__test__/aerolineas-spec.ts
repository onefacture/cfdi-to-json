import aerolineasTemplate from '../aerolineas';
describe('Aerolineas', () => {

    it('Execute without params', () => {
        expect(aerolineasTemplate()).toEqual({
            'aerolineas:Aerolineas': {
                position: 'aerolineas',
                attributes: ['version', 'tua'],
                nodes: {
                    'aerolineas:OtrosCargos': {
                        position: 'otrosCargos',
                        attributes: ['totalCargos'],
                        nodes: {
                            'aerolineas:Cargo': {
                                strictArrayResponse: true,
                                position: 'cargosArray',
                                attributes: ['codigoCargo', 'importe']
                            }
                        }
                    }
                }
            }
        });
    });

    it('Execute with minimalData true', () => {
        expect(aerolineasTemplate({
            minimalData: true
        })).toEqual({
            'aerolineas:Aerolineas': {
                position: 'aerolineas',
                attributes: ['version']
            }
        });
    });

    it('Execute with minimalData false', () => {
        expect(aerolineasTemplate({
            minimalData: false
        })).toEqual({
            'aerolineas:Aerolineas': {
                position: 'aerolineas',
                attributes: ['version', 'tua'],
                nodes: {
                    'aerolineas:OtrosCargos': {
                        position: 'otrosCargos',
                        attributes: ['totalCargos'],
                        nodes: {
                            'aerolineas:Cargo': {
                                strictArrayResponse: true,
                                position: 'cargosArray',
                                attributes: ['codigoCargo', 'importe']
                            }
                        }
                    }
                }
            }
        });
    });

});
