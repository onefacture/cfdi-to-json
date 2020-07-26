import CfdiExtractData from "..";

describe("CfdiExtractData:retenciones:Retenciones", () => {
  it("test1", () => {
    expect(
      CfdiExtractData.extractGeneralData({
        contentXML: `
                <?xml version="1.0" encoding="UTF-8"?>
                <retenciones:Retenciones
                  xmlns:retenciones="http://www.sat.gob.mx/esquemas/retencionpago/1"
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xmlns:plataformasTecnologicas="http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10"
                  xsi:schemaLocation="http://www.sat.gob.mx/esquemas/retencionpago/1 http://www.sat.gob.mx/esquemas/retencionpago/1/retencionpagov1.xsd http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10 http://www.sat.gob.mx/esquemas/retencionpago/1/PlataformasTecnologicas10/ServiciosPlataformasTecnologicas10.xsd"
                  Version="1.0" FolioInt="507020" FechaExp="2020-07-05T22:21:24-05:00" CveRetenc="26">
                    <retenciones:Emisor RFCEmisor="RFC_EMISOR" NomDenRazSocE="RAZÓN SOCIAL EMISOR" />
                    <retenciones:Receptor Nacionalidad="Nacional">
                        <retenciones:Nacional RFCRecep="RFC_RECEPTOR" />
                    </retenciones:Receptor>
                    <retenciones:Periodo MesIni="6" MesFin="6" Ejerc="2020" />
                    <retenciones:Totales montoTotOperacion="188.630000" montoTotGrav="188.630000" montoTotExent="0.00" montoTotRet="18.86">
                        <retenciones:ImpRetenidos BaseRet="188.63" Impuesto="01" montoRet="3.77" TipoPagoRet="Pago definitivo" />
                        <retenciones:ImpRetenidos BaseRet="30.18" Impuesto="02" montoRet="15.09" TipoPagoRet="Pago definitivo" />
                    </retenciones:Totales>
                    <retenciones:Complemento>
                        <plataformasTecnologicas:ServiciosPlataformasTecnologicas Version="1.0" Periodicidad="02" NumServ="1" MonTotServSIVA="188.630000" TotalIVATrasladado="30.180800" TotalIVARetenido="15.090000" TotalISRRetenido="3.770000" DifIVAEntregadoPrestServ="15.090800" MonTotalporUsoPlataforma="68.880000">
                            <plataformasTecnologicas:Servicios>
                                <plataformasTecnologicas:DetallesDelServicio FormaPagoServ="02" TipoDeServ="01" SubTipServ="01" FechaServ="2020-06-30" PrecioServSinIVA="188.630000">
                                    <plataformasTecnologicas:ImpuestosTrasladadosdelServicio Base="188.630000" Impuesto="02" TipoFactor="Tasa" TasaCuota="0.160000" Importe="30.180800" />
                                    <plataformasTecnologicas:ComisionDelServicio Importe="68.880000" />
                                </plataformasTecnologicas:DetallesDelServicio>
                            </plataformasTecnologicas:Servicios>
                        </plataformasTecnologicas:ServiciosPlataformasTecnologicas>
                        <tfd:TimbreFiscalDigital xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/TimbreFiscalDigital/TimbreFiscalDigital.xsd" version="1.0" selloCFD="SELLO_CFD" noCertificadoSAT="NO_CERTIFICADO_SAT" UUID="UUID_DEL_XML_DE_RETENCIONES" FechaTimbrado="2020-07-05T22:21:24" selloSAT="SELLO_SAT" />
                    </retenciones:Complemento>
                </retenciones:Retenciones>
            `
      })
    ).toEqual({
       "isRetencion": true,
       "cveRetenc": "26",
       "emisor": {
         "nomDenRazSocE": "RAZÓN SOCIAL EMISOR",
         "rfcEmisor": "RFC_EMISOR",
       },
       "fechaExp": "2020-07-05T22:21:24-05:00",
       "folioInt": "507020",
       "periodo": {
         "ejerc": "2020",
         "mesFin": "6",
         "mesIni": "6",
       },
       "plataformasTecnologicas": {
         "difIVAEntregadoPrestServ": "15.090800",
         "monTotServSIVA": "188.630000",
         "monTotalporUsoPlataforma": "68.880000",
         "numServ": "1",
         "periodicidad": "02",
         "servicios": [{
           "detalles": [{
             "comisionesDelServicio": [
               {
                 "importe": "68.880000",
               },
             ],
             "fechaServ": "2020-06-30",
             "formaPagoServ": "02",
             "precioServSinIVA": "188.630000",
             "subTipServ": "01",
             "tipoDeServ": "01",
             "traslados": [
               {
                 "base": "188.630000",
                 "importe": "30.180800",
                 "impuesto": "02",
                 "tasaCuota": "0.160000",
                 "tipoFactor": "Tasa",
               },
             ],
           }]
         }],
         "totalISRRetenido": "3.770000",
         "totalIVARetenido": "15.090000",
         "totalIVATrasladado": "30.180800",
         "version": "1.0",
       },
       "receptor": {
         "nacionalidad": "Nacional",
         "rfcRecep": "RFC_RECEPTOR",
       },
       "totales": {
         "impuestosRetenidos": [
           {
             "baseRet": "188.63",
             "impuesto": "01",
             "montoRet": "3.77",
             "tipoPagoRet": "Pago definitivo",
           },
           {
             "baseRet": "30.18",
             "impuesto": "02",
             "montoRet": "15.09",
             "tipoPagoRet": "Pago definitivo",
           },
         ],
         "montoTotExent": "0.00",
         "montoTotGrav": "188.630000",
         "montoTotOperacion": "188.630000",
         "montoTotRet": "18.86",
       },
      "timbreFiscal": {
        "fechaTimbrado": "2020-07-05T22:21:24",
        "noCertificadoSAT": "NO_CERTIFICADO_SAT",
        "selloCFD": "SELLO_CFD",
        "selloSAT": "SELLO_SAT",
        "uuid": "UUID_DEL_XML_DE_RETENCIONES",
      },
       "version": "1.0",
     });
  });
});
