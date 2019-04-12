import leyendasFiscalesTemplate from "../leyendas-fiscales";
describe("Leyendas fiscales data test", () => {
  it("Execute without params", () => {
    expect(leyendasFiscalesTemplate()).toEqual({
      "leyendasFisc:LeyendasFiscales": {
        position: "leyendasFiscales",
        attributes: ["version"],
        nodes: {
          "leyendasFisc:Leyenda": {
            strictArrayResponse: true,
            position: "leyendasArray",
            attributes: ["disposicionFiscal", "norma", "textoLeyenda"]
          }
        }
      }
    });
  });
  it("Execute with minimalData: False", () => {
    expect(leyendasFiscalesTemplate({ minimalData: false })).toEqual({
      "leyendasFisc:LeyendasFiscales": {
        position: "leyendasFiscales",
        attributes: ["version"],
        nodes: {
          "leyendasFisc:Leyenda": {
            strictArrayResponse: true,
            position: "leyendasArray",
            attributes: ["disposicionFiscal", "norma", "textoLeyenda"]
          }
        }
      }
    });
  });
  it("Execute with minimalData: True", () => {
    expect(leyendasFiscalesTemplate({ minimalData: true })).toEqual({
      "leyendasFisc:LeyendasFiscales": {
        position: "leyendasFiscales",
        attributes: ["version"]
      }
    });
  });
});
