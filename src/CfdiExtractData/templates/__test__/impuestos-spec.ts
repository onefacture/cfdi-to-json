import impuestosTemplate from "../impuestos";
describe("Impuestos data test", () => {
  it("Execute without params", () => {
    expect(impuestosTemplate()).toEqual({
      position: "impuestos",
      attributes: ["totalImpuestosRetenidos", "totalImpuestosTrasladados"],
      nodes: {
        'Traslados': {
          nodes: {
            'Traslado': {
              position: "traslados",
              strictArrayResponse: true,
              // Aplica tasa para cfdi v3.2
              attributes: [
                "impuesto",
                "tipoFactor",
                "tasaOCuota",
                "importe",
                "tasa"
              ]
            }
          }
        },
        'Retenciones': {
          nodes: {
            'Retencion': {
              position: "retenciones",
              strictArrayResponse: true,
              attributes: ["impuesto", "importe"]
            }
          }
        }
      }
    });
  });
});
