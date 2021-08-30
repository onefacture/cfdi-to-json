import CfdiExtractData from '..';

describe('CfdiExtractData', () => {

    it('Basic data', () => {
        expect(CfdiExtractData.extractGeneralData({
            contentXML: `
                <?xml version="1.0" encoding="utf-8"?>
                <cfdi:Comprobante
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:schemaLocation="http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd"
                LugarExpedicion="91164"
                MetodoPago="PUE"
                TipoDeComprobante="I"
                Total="499.00"
                Moneda="MXN"
                Certificado="OCULTO_EN_PREVISUALIZACIÓN"
                SubTotal="430.17"
                NoCertificado="OCULTO_EN_PREVISUALIZACIÓN"
                FormaPago="04"
                Sello="OCULTO_EN_PREVISUALIZACIÓN"
                Fecha="2019-04-02T10:41:20"
                Version="3.3"
                xmlns:cfdi="http://www.sat.gob.mx/cfd/3">
                    <cfdi:Emisor Rfc="RFC_EMISOR" Nombre="NOMBRE_DEL_EMISOR" RegimenFiscal="612"></cfdi:Emisor>
                    <Receptor Rfc="RFC_RECEPTOR" Nombre="NOMBRE_DEL_RECEPTOR" UsoCFDI="G03"></Receptor>
                    <cfdi:Conceptos>
                        <cfdi:Concepto ClaveProdServ="43231601" Cantidad="1" ClaveUnidad="E48" Unidad="Unidad de servicio" Descripcion="Licencia anual onefacture cfdi" ValorUnitario="430.17" Importe="430.17">
                            <Impuestos>
                                <cfdi:Traslados>
                                    <cfdi:Traslado Base="430.17" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="68.83"></cfdi:Traslado>
                                </cfdi:Traslados>
                            </Impuestos>
                        </cfdi:Concepto>
                    </cfdi:Conceptos>
                    <cfdi:Impuestos TotalImpuestosTrasladados="68.83">
                        <cfdi:Traslados>
                        <cfdi:Traslado Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="68.83"></cfdi:Traslado>
                        </cfdi:Traslados>
                    </cfdi:Impuestos>
                    <cfdi:Complemento>
                        <tfd:TimbreFiscalDigital
                        xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital"
                        xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigitalv11.xsd"
                        Version="1.1"
                        UUID="UUID_DEL_XML"
                        FechaTimbrado="2019-04-02T10:43:47"
                        RfcProvCertif="SAT970701NN3"
                        SelloCFD="OCULTO_EN_PREVISUALIZACIÓN"
                        NoCertificadoSAT="NO_CERTIFICADO_SAT"
                        SelloSAT="OCULTO_EN_PREVISUALIZACIÓN"
                    />
                    </cfdi:Complemento>
                </cfdi:Comprobante>
            `
        }))
        .toEqual({
            "timbreFiscal": {
                "uuid": "UUID_DEL_XML",
                "RFCProvCertif": "SAT970701NN3",
                "selloCFD": "OCULTO_EN_PREVISUALIZACIÓN",
                "selloSAT": "OCULTO_EN_PREVISUALIZACIÓN",
                "noCertificadoSAT": "NO_CERTIFICADO_SAT",
                "fechaTimbrado": "2019-04-02T10:43:47",
            },
            "certificado": "OCULTO_EN_PREVISUALIZACIÓN",
            "conceptos": [{
                "cantidad": "1",
                "claveProdServ": "43231601",
                "claveUnidad": "E48",
                "descripcion": "Licencia anual onefacture cfdi",
                "importe": "430.17",
                "impuestos":  {
                    "traslados": [
                        {
                        "base": "430.17",
                        "importe": "68.83",
                        "impuesto": "002",
                        "tasaOCuota": "0.160000",
                        "tipoFactor": "Tasa",
                        },
                    ],
                },
                "unidad": "Unidad de servicio",
                "valorUnitario": "430.17",
            }],
            "emisor":  {
                "nombre": "NOMBRE_DEL_EMISOR",
                "regimenFiscal": "612",
                "rfc": "RFC_EMISOR",
            },
            "fecha": "2019-04-02T10:41:20",
            "formaPago": "04",
            "impuestos":  {
                "totalImpuestosTrasladados": 68.83,
                "traslados": [{
                    "importe": 68.83,
                    "impuesto": "002",
                    "tasaOCuota": "0.160000",
                    "tipoFactor": "Tasa",
                }],
            },
            "lugarExpedicion": "91164",
            "metodoPago": "PUE",
            "moneda": "MXN",
            "noCertificado": "OCULTO_EN_PREVISUALIZACIÓN",
            "receptor":  {
                "nombre": "NOMBRE_DEL_RECEPTOR",
                "rfc": "RFC_RECEPTOR",
                "usoCFDI": "G03",
            },
            "sello": "OCULTO_EN_PREVISUALIZACIÓN",
            "subTotal": "430.17",
            "tipoDeComprobante": "I",
            "total": "499.00",
            "version": "3.3",
        });
    });

    it('Basic data without namespace tfd', () => {
        expect(CfdiExtractData.extractGeneralData({
            contentXML: `
                <?xml version="1.0" encoding="utf-8"?>
                <cfdi:Comprobante
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xsi:schemaLocation="http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv33.xsd"
                LugarExpedicion="91164"
                MetodoPago="PUE"
                TipoDeComprobante="I"
                Total="499.00"
                Moneda="MXN"
                Certificado="OCULTO_EN_PREVISUALIZACIÓN"
                SubTotal="430.17"
                NoCertificado="OCULTO_EN_PREVISUALIZACIÓN"
                FormaPago="04"
                Sello="OCULTO_EN_PREVISUALIZACIÓN"
                Fecha="2019-04-02T10:41:20"
                Version="3.3"
                xmlns:cfdi="http://www.sat.gob.mx/cfd/3">
                    <cfdi:Emisor Rfc="OIRR940203TH7" Nombre="RICARDO ALAN OLIVARES RUIZ" RegimenFiscal="612"></cfdi:Emisor>
                    <cfdi:Receptor Rfc="DCC1510017K2" Nombre="DRL. CONSULTORES CONTABLES SC" UsoCFDI="G03"></cfdi:Receptor>
                    <cfdi:Conceptos>
                        <cfdi:Concepto ClaveProdServ="43231601" Cantidad="1" ClaveUnidad="E48" Unidad="Unidad de servicio" Descripcion="Licencia anual onefacture cfdi" ValorUnitario="430.17" Importe="430.17">
                            <cfdi:Impuestos>
                                <cfdi:Traslados>
                                    <cfdi:Traslado Base="430.17" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="68.83"></cfdi:Traslado>
                                </cfdi:Traslados>
                            </cfdi:Impuestos>
                        </cfdi:Concepto>
                    </cfdi:Conceptos>
                    <cfdi:Impuestos TotalImpuestosTrasladados="68.83">
                        <cfdi:Traslados>
                        <cfdi:Traslado Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="68.83"></cfdi:Traslado>
                        </cfdi:Traslados>
                    </cfdi:Impuestos>
                    <cfdi:Complemento>
                        <TimbreFiscalDigital
                        xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital"
                        xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/cfd/TimbreFiscalDigital/TimbreFiscalDigitalv11.xsd"
                        Version="1.1"
                        UUID="012864A0-4435-4199-9236-95A8DA9439E5"
                        FechaTimbrado="2019-04-02T10:43:47"
                        RfcProvCertif="SAT970701NN3"
                        SelloCFD="OCULTO_EN_PREVISUALIZACIÓN"
                        NoCertificadoSAT="00001000000403258748"
                        SelloSAT="OCULTO_EN_PREVISUALIZACIÓN"
                    />
                    </cfdi:Complemento>
                </cfdi:Comprobante>
            `
        }))
        .toEqual({
            "timbreFiscal": {
                "uuid": "012864A0-4435-4199-9236-95A8DA9439E5",
                "RFCProvCertif": "SAT970701NN3",
                "selloCFD": "OCULTO_EN_PREVISUALIZACIÓN",
                "selloSAT": "OCULTO_EN_PREVISUALIZACIÓN",
                "noCertificadoSAT": "00001000000403258748",
                "fechaTimbrado": "2019-04-02T10:43:47",
            },
            "certificado": "OCULTO_EN_PREVISUALIZACIÓN",
            "conceptos": [{
                "cantidad": "1",
                "claveProdServ": "43231601",
                "claveUnidad": "E48",
                "descripcion": "Licencia anual onefacture cfdi",
                "importe": "430.17",
                "impuestos":  {
                    "traslados": [
                        {
                        "base": "430.17",
                        "importe": "68.83",
                        "impuesto": "002",
                        "tasaOCuota": "0.160000",
                        "tipoFactor": "Tasa",
                        },
                    ],
                },
                "unidad": "Unidad de servicio",
                "valorUnitario": "430.17",
            }],
            "emisor":  {
                "nombre": "RICARDO ALAN OLIVARES RUIZ",
                "regimenFiscal": "612",
                "rfc": "OIRR940203TH7",
            },
            "fecha": "2019-04-02T10:41:20",
            "formaPago": "04",
            "impuestos":  {
                "totalImpuestosTrasladados": 68.83,
                "traslados": [{
                    "importe": 68.83,
                    "impuesto": "002",
                    "tasaOCuota": "0.160000",
                    "tipoFactor": "Tasa",
                }],
            },
            "lugarExpedicion": "91164",
            "metodoPago": "PUE",
            "moneda": "MXN",
            "noCertificado": "OCULTO_EN_PREVISUALIZACIÓN",
            "receptor":  {
                "nombre": "DRL. CONSULTORES CONTABLES SC",
                "rfc": "DCC1510017K2",
                "usoCFDI": "G03",
            },
            "sello": "OCULTO_EN_PREVISUALIZACIÓN",
            "subTotal": "430.17",
            "tipoDeComprobante": "I",
            "total": "499.00",
            "version": "3.3",
        });
    });

    it('Emisor', () => {
        expect(CfdiExtractData.extractGeneralData({
            contentXML: `
                <?xml version="1.0" encoding="utf-8"?>
                <cfdi:Comprobante
                    xmlns:cfdi="http://www.sat.gob.mx/cfd/3"
                    Version="3.3"
                >
                    <cfdi:Emisor
                        Rfc="RFC_EMISOR"
                        Nombre="NOMBRE_DEL_EMISOR"
                        RegimenFiscal="612"
                    ></cfdi:Emisor>
                </cfdi:Comprobante>
            `
        }))
        .toEqual({
            "version": "3.3",
            "emisor":  {
                "nombre": "NOMBRE_DEL_EMISOR",
                "regimenFiscal": "612",
                "rfc": "RFC_EMISOR"
            }
        });
    });

    it('Basic data without namespace cfdi in root tag', () => {
        expect(CfdiExtractData.extractGeneralData({
            contentXML: `
                <?xml version="1.0" encoding="utf-8"?>
                <Comprobante
                    xmlns:cfdi="http://www.sat.gob.mx/cfd/3"
                    Version="3.3"
                >
                    <cfdi:Emisor
                        Rfc="RFC_EMISOR"
                        Nombre="NOMBRE_DEL_EMISOR"
                        RegimenFiscal="612"
                    ></cfdi:Emisor>
                </Comprobante>
            `
        }))
        .toEqual({
            "version": "3.3",
            "emisor":  {
                "nombre": "NOMBRE_DEL_EMISOR",
                "regimenFiscal": "612",
                "rfc": "RFC_EMISOR"
            }
        });
    });

    it('Receptor', () => {
        expect(CfdiExtractData.extractGeneralData({
            contentXML: `
                <?xml version="1.0" encoding="utf-8"?>
                <cfdi:Comprobante
                    xmlns:cfdi="http://www.sat.gob.mx/cfd/3"
                    Version="3.3"
                >
                    <cfdi:Receptor
                        Rfc="RFC_RECEPTOR"
                        Nombre="NOMBRE_DEL_RECEPTOR"
                        UsoCFDI="G03"
                        ></cfdi:Receptor>
                </cfdi:Comprobante>
            `
        }))
        .toEqual({
            "version": "3.3",
            "receptor":  {
                "nombre": "NOMBRE_DEL_RECEPTOR",
                "rfc": "RFC_RECEPTOR",
                "usoCFDI": "G03"
            }
        });
    });

    it('Conceptos', () => {
        expect(CfdiExtractData.extractGeneralData({
            contentXML: `
                <?xml version="1.0" encoding="utf-8"?>
                <cfdi:Comprobante
                    xmlns:cfdi="http://www.sat.gob.mx/cfd/3"
                    Version="3.3"
                >
                    <cfdi:Conceptos>
                        <cfdi:Concepto
                            ClaveProdServ="43231601"
                            Cantidad="1"
                            ClaveUnidad="E48"
                            Unidad="Unidad de servicio"
                            Descripcion="Licencia anual onefacture cfdi"
                            ValorUnitario="430.17"
                            Importe="430.17"
                        >
                            <cfdi:Impuestos>
                                <cfdi:Traslados>
                                    <cfdi:Traslado Base="430.17" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="68.83"></cfdi:Traslado>
                                </cfdi:Traslados>
                            </cfdi:Impuestos>
                        </cfdi:Concepto>
                    </cfdi:Conceptos>
                </cfdi:Comprobante>
            `
        }))
        .toEqual({
            "version": "3.3",
            "conceptos": [{
                "cantidad": "1",
                "claveProdServ": "43231601",
                "claveUnidad": "E48",
                "descripcion": "Licencia anual onefacture cfdi",
                "importe": "430.17",
                "impuestos":  {
                    "traslados": [
                        {
                        "base": "430.17",
                        "importe": "68.83",
                        "impuesto": "002",
                        "tasaOCuota": "0.160000",
                        "tipoFactor": "Tasa",
                        },
                    ],
                },
                "unidad": "Unidad de servicio",
                "valorUnitario": "430.17",
            }],
        });
    });

    it('Impuestos', () => {
        expect(CfdiExtractData.extractGeneralData({
            contentXML: `
                <?xml version="1.0" encoding="utf-8"?>
                <cfdi:Comprobante
                    xmlns:cfdi="http://www.sat.gob.mx/cfd/3"
                    Version="3.3"
                >
                    <cfdi:Impuestos TotalImpuestosTrasladados="68.83">
                        <cfdi:Traslados>
                            <cfdi:Traslado
                                Impuesto="002"
                                TipoFactor="Tasa"
                                TasaOCuota="0.160000"
                                Importe="68.83"
                            ></cfdi:Traslado>
                        </cfdi:Traslados>
                    </cfdi:Impuestos>
                </cfdi:Comprobante>
            `
        }))
        .toEqual({
            "version": "3.3",
            "impuestos":  {
                "totalImpuestosTrasladados": 68.83,
                "traslados": [{
                    "importe": 68.83,
                    "impuesto": "002",
                    "tasaOCuota": "0.160000",
                    "tipoFactor": "Tasa"
                }]
            }
        });
    });

});
