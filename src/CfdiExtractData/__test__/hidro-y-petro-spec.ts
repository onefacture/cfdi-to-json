import { parse } from '../..';

function hidroYPetro(attributes: string, prefix: string = 'hidrocarburospetroliferos') {
    const tag = prefix ? `${prefix}:HidroYPetro` : 'HidroYPetro';
    const namespace = prefix ? `xmlns:${prefix}` : 'xmlns';
    return `<${tag} ${namespace}="http://www.sat.gob.mx/hidrocarburospetroliferos" ${attributes} />`;
}

function concepto(complement?: string, id: string = '1') {
    return `
        <cfdi:Concepto NoIdentificacion="${id}" Descripcion="Combustible ${id}"
            ClaveProdServ="15101505" Cantidad="1" ClaveUnidad="LTR" ValorUnitario="10" Importe="10">
            ${complement === undefined ? '' : `<cfdi:ComplementoConcepto>${complement}</cfdi:ComplementoConcepto>`}
        </cfdi:Concepto>
    `;
}

function comprobante(concepts: string, version: string = '4.0') {
    return `
        <cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/${version === '4.0' ? '4' : '3'}"
            Version="${version}" Serie="HYP" Total="10" SubTotal="10">
            <cfdi:Conceptos>${concepts}</cfdi:Conceptos>
        </cfdi:Comprobante>
    `;
}

describe('HidroYPetro concept complement', () => {
    [false, true].forEach(minimalData => {
        describe(`minimalData: ${minimalData}`, () => {
            it('reads the attributes from the supplied XML example', () => {
                const data = parse({
                    minimalData,
                    contentXML: comprobante(concepto(hidroYPetro(
                        'Version="1.0" TipoPermiso="PER03" NumeroPermiso="PL/13228/DIS/OM/2016" ClaveHYP="15101505" SubProductoHYP="SP18"'
                    )))
                });

                expect(data.conceptos).toHaveLength(1);
                expect(data.conceptos[0].hidroYPetro).toEqual({ tipoPermiso: 'PER03', subProductoHYP: 'SP18' });
                expect(data).not.toHaveProperty('hidroYPetro');
                if(!minimalData) {
                    expect(data.conceptos[0].descripcion).toBe('Combustible 1');
                    expect(data.conceptos[0].importe).toBe(10);
                }
            });

            it('preserves leading zeros and letter case as text', () => {
                const data = parse({
                    minimalData,
                    contentXML: comprobante(concepto(hidroYPetro('TipoPermiso="001" SubProductoHYP="0007aB"')))
                });

                expect(data.conceptos[0].hidroYPetro).toEqual({ tipoPermiso: '001', subProductoHYP: '0007aB' });
            });

            [
                { attributes: 'TipoPermiso="PER03"', expected: { tipoPermiso: 'PER03' } },
                { attributes: 'SubProductoHYP="0007"', expected: { subProductoHYP: '0007' } },
                { attributes: '', expected: {} }
            ].forEach(({ attributes, expected }) => {
                it(`does not invent missing attributes when given ${attributes || 'no attributes'}`, () => {
                    const data = parse({
                        minimalData,
                        contentXML: comprobante(concepto(hidroYPetro(attributes)))
                    });

                    expect(data.conceptos[0].hidroYPetro).toEqual(expected);
                });
            });

            [undefined, ''].forEach(complement => {
                it(`omits hidroYPetro with ${complement === undefined ? 'no ComplementoConcepto' : 'an empty ComplementoConcepto'}`, () => {
                    const data = parse({ minimalData, contentXML: comprobante(concepto(complement)) });

                    expect(data.conceptos).toHaveLength(1);
                    expect(data.conceptos[0]).not.toHaveProperty('hidroYPetro');
                });
            });

            it('keeps each complement on its own concept without inheriting earlier values', () => {
                const data = parse({
                    minimalData,
                    contentXML: comprobante([
                        concepto(hidroYPetro('TipoPermiso="PER03" SubProductoHYP="SP18"'), '1'),
                        concepto(undefined, '2'),
                        concepto(hidroYPetro('TipoPermiso="PER04"'), '3'),
                        concepto('', '4'),
                        concepto(hidroYPetro('SubProductoHYP="0009"'), '5'),
                        concepto(hidroYPetro(''), '6')
                    ].join(''))
                });

                expect(data.conceptos).toHaveLength(6);
                expect(data.conceptos.map((item: any) => item.hidroYPetro)).toEqual([
                    { tipoPermiso: 'PER03', subProductoHYP: 'SP18' },
                    undefined,
                    { tipoPermiso: 'PER04' },
                    undefined,
                    { subProductoHYP: '0009' },
                    {}
                ]);
                expect(data.conceptos[1]).not.toHaveProperty('hidroYPetro');
                expect(data.conceptos[3]).not.toHaveProperty('hidroYPetro');
                expect(data.conceptos[0]).not.toBe(data.conceptos[1]);
                if(!minimalData) {
                    expect(data.conceptos.map((item: any) => item.noIdentificacion)).toEqual(['1', '2', '3', '4', '5', '6']);
                }
            });

            ['hy', ''].forEach(prefix => {
                it(`accepts ${prefix ? 'a different prefix' : 'a default namespace'}`, () => {
                    const data = parse({
                        minimalData,
                        contentXML: comprobante(concepto(hidroYPetro('TipoPermiso="PER03" SubProductoHYP="SP18"', prefix)))
                    });

                    expect(data.conceptos[0].hidroYPetro).toEqual({ tipoPermiso: 'PER03', subProductoHYP: 'SP18' });
                });
            });

            it('preserves other concept complements alongside HidroYPetro', () => {
                const data = parse({
                    minimalData,
                    contentXML: comprobante(concepto(
                        '<iedu:instEducativas xmlns:iedu="http://www.sat.gob.mx/iedu" version="1.0" />' +
                        hidroYPetro('TipoPermiso="PER03" SubProductoHYP="SP18"')
                    ))
                });

                expect(data.conceptos[0].instEducativa).toEqual({ version: '1.0' });
                expect(data.conceptos[0].hidroYPetro).toEqual({ tipoPermiso: 'PER03', subProductoHYP: 'SP18' });
            });

            ['3.2', '3.3'].forEach(version => {
                it(`uses the shared concept complement definition for CFDI ${version}`, () => {
                    const data = parse({
                        minimalData,
                        contentXML: comprobante(concepto(hidroYPetro('TipoPermiso="PER03" SubProductoHYP="SP18"')), version)
                    });

                    expect(data.conceptos[0].hidroYPetro).toEqual({ tipoPermiso: 'PER03', subProductoHYP: 'SP18' });
                });
            });
        });
    });

    [[true, false, true], [false, true, false]].forEach(modes => {
        it(`keeps CFDI 4.0 templates separate when alternating modes ${modes.join(', ')}`, () => {
            jest.resetModules();
            const parseFresh = require('../..').parse;
            const contentXML = comprobante(concepto(hidroYPetro('TipoPermiso="PER03" SubProductoHYP="SP18"')));

            modes.forEach(minimalData => {
                const data = parseFresh({ contentXML, minimalData });

                expect(data.conceptos[0].hidroYPetro).toEqual({ tipoPermiso: 'PER03', subProductoHYP: 'SP18' });
                if(minimalData) {
                    expect(data).not.toHaveProperty('serie');
                    expect(data.conceptos[0]).not.toHaveProperty('descripcion');
                } else {
                    expect(data.serie).toBe('HYP');
                    expect(data.conceptos[0].descripcion).toBe('Combustible 1');
                }
            });
        });
    });
});
