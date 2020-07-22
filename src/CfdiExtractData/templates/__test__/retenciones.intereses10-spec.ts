import intereses10Template from "../retenciones.intereses10";
describe("Aerolineas data test", () => {
  it("Execute without params", () => {
    expect(intereses10Template()).toEqual({
      "intereses:Intereses": {
        position: "intereses",
        attributes: [
          "version",
          "sistFinanciero",
          "retiroAORESRetInt",
          "operFinancDerivad",
          "montIntNominal",
          "montIntReal",
          "perdida",
        ]
      }
    });
  });

  it("Execute with minimalData true", () => {
    expect(
      intereses10Template({
        minimalData: true
      })
    ).toEqual({
      "intereses:Intereses": {
        position: "intereses",
        attributes: [ "version" ]
      }
    });
  });

  it("Execute with minimalData false", () => {
    expect(
      intereses10Template({
        minimalData: false
      })
    ).toEqual({
      "intereses:Intereses": {
        position: "intereses",
        attributes: [
          "version",
          "sistFinanciero",
          "retiroAORESRetInt",
          "operFinancDerivad",
          "montIntNominal",
          "montIntReal",
          "perdida",
        ]
      }
    });
  });
});
