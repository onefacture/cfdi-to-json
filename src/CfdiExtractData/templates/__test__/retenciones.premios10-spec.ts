import premios10Template from "../retenciones.premios10";
describe("Aerolineas data test", () => {
  it("Execute without params", () => {
    expect(premios10Template()).toEqual({
      "premios:Premios": {
        position: "premios",
        attributes: [
          "version",
          "entidadFederativa",
          "montTotPago",
          "montTotPagoGrav",
          "montTotPagoExent",
        ]
      }
    });
  });

  it("Execute with minimalData true", () => {
    expect(
      premios10Template({
        minimalData: true
      })
    ).toEqual({
      "premios:Premios": {
        position: "premios",
        attributes: ["version"]
      }
    });
  });

  it("Execute with minimalData false", () => {
    expect(
      premios10Template({
        minimalData: false
      })
    ).toEqual({
      "premios:Premios": {
        position: "premios",
        attributes: [
          "version",
          "entidadFederativa",
          "montTotPago",
          "montTotPagoGrav",
          "montTotPagoExent",
        ]
      }
    });
  });
});
