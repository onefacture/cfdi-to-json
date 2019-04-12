import CfdiExtractData from "..";

describe("CfdiExtractData:Cosumodeconbustibles11", () => {
  it("test1", () => {
    expect(
      CfdiExtractData.extractGeneralData({
        contentXML: `
                <?xml version="1.0" encoding="utf-8"?>
                <cfdi:Comprobante
                    xmlns:cfdi="http://www.sat.gob.mx/cfd/3"
                    xmlns:consumodecombustibles11="http://www.sat.gob.mx/ConsumoDeCombustibles11"
                    Version="3.3"
                >
                    <cfdi:Complemento>
                    <consumodecombustibles11:ConsumoDeCombustibles version="1.1" numeroDeCuenta="4618794285" tipoOperacion="monedero electrÃ³nico" subTotal="450" total="522">
                    <consumodecombustibles11:Conceptos>
                      <consumodecombustibles11:ConceptoConsumoDeCombustibles identificador="467815492" fecha="2018-06-11T10:17:55" rfc="GPR0911217G4" claveEstacion="17493584" tipoCombustible="5" cantidad="30.000" nombreCombustible="Gasolina" folioOperacion="50" valorUnitario="15.00" importe="450.00">
                        <consumodecombustibles11:Determinados>
                          <consumodecombustibles11:Determinado impuesto="IVA" tasaOCuota="16.00" importe="72.00" />
                        </consumodecombustibles11:Determinados>
                      </consumodecombustibles11:ConceptoConsumoDeCombustibles>
                    </consumodecombustibles11:Conceptos>
                  </consumodecombustibles11:ConsumoDeCombustibles>
                    </cfdi:Complemento>
                </cfdi:Comprobante>
            `
      })
    ).toEqual({
      version: "3.3",
      consumoDeCombustibles: {
        conceptos: [
          {
            cantidad: "30.000",
            claveEstacion: "17493584",
            determinados: [
              {
                importe: "72.00",
                impuesto: "IVA",
                tasaOCuota: "16.00"
              }
            ],
            fecha: "2018-06-11T10:17:55",
            folioOperacion: "50",
            identificador: "467815492",
            importe: "450.00",
            nombreCombustible: "Gasolina",
            rfc: "GPR0911217G4",
            tipoCombustible: "5",
            valorUnitario: "15.00"
          }
        ],
        numeroDeCuenta: "4618794285",
        subTotal: "450",
        tipoOperacion: "monedero electrÃ³nico",
        total: "522",
        version: "1.1"
      }
    });
  });
});
