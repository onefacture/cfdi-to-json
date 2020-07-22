import interesesHipotecarios10Template from "../retenciones.interesesHipotecarios10";
describe("Aerolineas data test", () => {
  it("Execute without params", () => {
    expect(interesesHipotecarios10Template()).toEqual({
      "intereseshipotecarios:Intereseshipotecarios": {
        position: "interesesHipotecarios",
        attributes: [
          "version",
          "creditoDeInstFinanc",
          "saldoInsoluto",
          "propDeducDelCredit",
          "montTotIntNominalesDev",
          "montTotIntNominalesDevYPag",
          "montTotIntRealPagDeduc",
          "numContrato",
        ]
      }
    });
  });

  it("Execute with minimalData true", () => {
    expect(
      interesesHipotecarios10Template({
        minimalData: true
      })
    ).toEqual({
      "intereseshipotecarios:Intereseshipotecarios": {
        position: "interesesHipotecarios",
        attributes: ["version"]
      }
    });
  });

  it("Execute with minimalData false", () => {
    expect(
      interesesHipotecarios10Template({
        minimalData: false
      })
    ).toEqual({
      "intereseshipotecarios:Intereseshipotecarios": {
        position: "interesesHipotecarios",
        attributes: [
          "version",
          "creditoDeInstFinanc",
          "saldoInsoluto",
          "propDeducDelCredit",
          "montTotIntNominalesDev",
          "montTotIntNominalesDevYPag",
          "montTotIntRealPagDeduc",
          "numContrato",
        ]
      }
    });
  });
});
