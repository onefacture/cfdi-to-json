import CfdiExtractData from './CfdiExtractData';

const { extractGeneralData } = CfdiExtractData

console.log(extractGeneralData({
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
                <tfd:TimbreFiscalDigital
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
}));

export {
	extractGeneralData
};

