import pagoEnEspecieTemplate from "../pago-en-especie";
describe("Pago en especie data test", () => {
  it("Execute without params", () => {
    expect(pagoEnEspecieTemplate()).toEqual({
      "pagoenespecie:PagoEnEspecie": {
        position: "pagoEnEspecie",
        attributes: [
          "version",
          "cvePIC",
          "folioSolDon",
          "pzaArtNombre",
          "pzaArtTecn",
          "pzaArtAProd",
          "pzaArtDim"
        ]
      }
    });
  });
  it("Execute with minimalData: False", () => {
    expect(pagoEnEspecieTemplate({ minimalData: false })).toEqual({
      "pagoenespecie:PagoEnEspecie": {
        position: "pagoEnEspecie",
        attributes: [
          "version",
          "cvePIC",
          "folioSolDon",
          "pzaArtNombre",
          "pzaArtTecn",
          "pzaArtAProd",
          "pzaArtDim"
        ]
      }
    });
  });
  it("Execute with minimalData: True", () => {
    expect(pagoEnEspecieTemplate({ minimalData: true })).toEqual({
      "pagoenespecie:PagoEnEspecie": {
        position: "pagoEnEspecie",
        attributes: ["version"]
      }
    });
  });
});
