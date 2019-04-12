import obrasArteAntiguedadesTemplate from "../obras-arte-antiguedades";
describe("Obras de arte, antiguedades data test", () => {
  it("Execute without params", () => {
    expect(obrasArteAntiguedadesTemplate()).toEqual({
      "obrasarte:obrasarteantiguedades": {
        position: "obrasarteAntiguedades",
        attributes: [
          "version",
          "tipoBien",
          "otrosTipoBien",
          "tituloAdquirido",
          "otrosTituloAdquirido",
          "subTotal",
          "iva",
          "fechaAdquisicion",
          "caracteristicasDeObraoPieza"
        ]
      }
    });
  });
  it("Execute with minimalData: False", () => {
    expect(obrasArteAntiguedadesTemplate({ minimalData: false })).toEqual({
      "obrasarte:obrasarteantiguedades": {
        position: "obrasarteAntiguedades",
        attributes: [
          "version",
          "tipoBien",
          "otrosTipoBien",
          "tituloAdquirido",
          "otrosTituloAdquirido",
          "subTotal",
          "iva",
          "fechaAdquisicion",
          "caracteristicasDeObraoPieza"
        ]
      }
    });
  });
  it("Execute with minimalData: True", () => {
    expect(obrasArteAntiguedadesTemplate({ minimalData: true })).toEqual({
      "obrasarte:obrasarteantiguedades": {
        position: "obrasarteAntiguedades",
        attributes: ["version"]
      }
    });
  });
});
