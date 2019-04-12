import impLocalTemplate from "../imp-local";
describe("Impuestos locales data test", () => {
  it("Execute without params", () => {
    expect(impLocalTemplate()).toEqual({
      "implocal:ImpuestosLocales": {
        position: "impuestosLocales",
        attributes: ["totalDeRetenciones", "totalDeTraslados"],
        nodes: {
          "implocal:RetencionesLocales": {
            strictArrayResponse: true,
            position: "retencionesLocales",
            attributes: ["impLocRetenido", "tasaDeRetencion", "importe"]
          },
          "implocal:TrasladosLocales": {
            strictArrayResponse: true,
            position: "trasladosLocales",
            attributes: ["impLocTrasladado", "tasaDeTraslado", "importe"]
          }
        }
      }
    });
  });
  it("Execute with minimalData: False", () => {
    expect(impLocalTemplate({ minimalData: false })).toEqual({
      "implocal:ImpuestosLocales": {
        position: "impuestosLocales",
        attributes: ["totalDeRetenciones", "totalDeTraslados"],
        nodes: {
          "implocal:RetencionesLocales": {
            strictArrayResponse: true,
            position: "retencionesLocales",
            attributes: ["impLocRetenido", "tasaDeRetencion", "importe"]
          },
          "implocal:TrasladosLocales": {
            strictArrayResponse: true,
            position: "trasladosLocales",
            attributes: ["impLocTrasladado", "tasaDeTraslado", "importe"]
          }
        }
      }
    });
  });
  it("Execute with minimalData: True", () => {
    expect(impLocalTemplate({ minimalData: true })).toEqual({
      "implocal:ImpuestosLocales": {
        position: "impuestosLocales",
        attributes: ["totalDeRetenciones", "totalDeTraslados"]
      }
    });
  });
});
