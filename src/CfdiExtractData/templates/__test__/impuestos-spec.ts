import impuestosTemplate from "../impuestos";
describe("Impuestos data test", () => {
  it("Execute without params", () => {
    expect(impuestosTemplate({ namespace: "cfdi" })).toEqual({
      position: "impuestos",
      attributes: ["totalImpuestosRetenidos", "totalImpuestosTrasladados"],
      nodes: {
        [`cfdi:Traslados`]: {
          nodes: {
            [`cfdi:Traslado`]: {
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
        [`cfdi:Retenciones`]: {
          nodes: {
            [`cfdi:Retencion`]: {
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
