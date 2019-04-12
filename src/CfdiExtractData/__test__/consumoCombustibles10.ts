import CfdiExtractData from "..";

describe("CfdiExtractData:Cosumodeconbustibles10", () => {
  it("test1", () => {
    expect(
      CfdiExtractData.extractGeneralData({
        contentXML: `
                <?xml version="1.0" encoding="utf-8"?>
                <cfdi:Comprobante
                    xmlns:cfdi="http://www.sat.gob.mx/cfd/3"
                    xmlns:consumodecombustibles="http://www.sat.gob.mx/Consumodecombustibles"
                    Version="3.3"
                >
                    <cfdi:Complemento>
                        <consumodecombustibles:ConsumoDeCombustibles version="1.0" tipoOperacion="monedero electrónico"
                        numeroDeCuenta="A001385-1" total="158581.25">
                            <consumodecombustibles:Conceptos>
                                <consumodecombustibles:ConceptoConsumoDeCombustibles identificador="13847"
                                fecha="2014-07-01T03:08:22" rfc="SMP620426HT0" claveEstacion="555" cantidad="120.48"
                                nombreCombustible="Diesel" folioOperacion="1477" valorUnitario="13.28" importe="1600.00">
                                    <consumodecombustibles:Determinados>
                                        <consumodecombustibles:Determinado impuesto="IVA" tasa="16" importe="220.69"/>
                                    </consumodecombustibles:Determinados>
                                </consumodecombustibles:ConceptoConsumoDeCombustibles>
                                <consumodecombustibles:ConceptoConsumoDeCombustibles identificador="198846"
                                    fecha="2014-07-01T03:09:18" rfc="SMO920826HB0" claveEstacion="208" cantidad="112.95"
                                    nombreCombustible="Diesel" folioOperacion="1478" valorUnitario="13.28" importe="1500.00">
                                    <consumodecombustibles:Determinados>
                                        <consumodecombustibles:Determinado impuesto="IVA" tasa="16" importe="206.90"/>
                                    </consumodecombustibles:Determinados>
                                </consumodecombustibles:ConceptoConsumoDeCombustibles>
                                <consumodecombustibles:ConceptoConsumoDeCombustibles identificador="235248"
                                fecha="2014-07-01T03:13:33" rfc="SMO920826HB0" claveEstacion="208" cantidad="47.78"
                                nombreCombustible="Magna" folioOperacion="1479" valorUnitario="12.77" importe="610.15">
                                    <consumodecombustibles:Determinados>
                                        <consumodecombustibles:Determinado impuesto="IVA" tasa="16" importe="84.16"/>
                                    </consumodecombustibles:Determinados>
                                </consumodecombustibles:ConceptoConsumoDeCombustibles>
                                <consumodecombustibles:ConceptoConsumoDeCombustibles identificador="264229"
                                fecha="2014-07-08T08:59:00" rfc="SMO920826HB0" claveEstacion="208" cantidad="15.55"
                                nombreCombustible="Magna" folioOperacion="1569" valorUnitario="12.86" importe="200.00">
                                    <consumodecombustibles:Determinados>
                                        <consumodecombustibles:Determinado impuesto="IVA" tasa="16" importe="27.59"/>
                                    </consumodecombustibles:Determinados>
                                </consumodecombustibles:ConceptoConsumoDeCombustibles>
                            </consumodecombustibles:Conceptos>
                        </consumodecombustibles:ConsumoDeCombustibles>
                    </cfdi:Complemento>
                </cfdi:Comprobante>
            `
      })
    ).toEqual({
      version: "3.3",
      consumoDeCombustibles: {
        conceptos: [
          {
            cantidad: "120.48",
            claveEstacion: "555",
            determinados: [
              {
                importe: "220.69",
                impuesto: "IVA",
                tasa: "16"
              }
            ],
            fecha: "2014-07-01T03:08:22",
            folioOperacion: "1477",
            identificador: "13847",
            importe: "1600.00",
            nombreCombustible: "Diesel",
            rfc: "SMP620426HT0",
            valorUnitario: "13.28"
          },
          {
            cantidad: "112.95",
            claveEstacion: "208",
            determinados: [
              {
                importe: "206.90",
                impuesto: "IVA",
                tasa: "16"
              }
            ],
            fecha: "2014-07-01T03:09:18",
            folioOperacion: "1478",
            identificador: "198846",
            importe: "1500.00",
            nombreCombustible: "Diesel",
            rfc: "SMO920826HB0",
            valorUnitario: "13.28"
          },
          {
            cantidad: "47.78",
            claveEstacion: "208",
            determinados: [
              {
                importe: "84.16",
                impuesto: "IVA",
                tasa: "16"
              }
            ],
            fecha: "2014-07-01T03:13:33",
            folioOperacion: "1479",
            identificador: "235248",
            importe: "610.15",
            nombreCombustible: "Magna",
            rfc: "SMO920826HB0",
            valorUnitario: "12.77"
          },
          {
            cantidad: "15.55",
            claveEstacion: "208",
            determinados: [
              {
                importe: "27.59",
                impuesto: "IVA",
                tasa: "16"
              }
            ],
            fecha: "2014-07-08T08:59:00",
            folioOperacion: "1569",
            identificador: "264229",
            importe: "200.00",
            nombreCombustible: "Magna",
            rfc: "SMO920826HB0",
            valorUnitario: "12.86"
          }
        ],
        numeroDeCuenta: "A001385-1",
        tipoOperacion: "monedero electrónico",
        total: "158581.25",
        version: "1.0"
      }
    });
  });
});
