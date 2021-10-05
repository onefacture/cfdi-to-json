import arrendamientoEnFideicomisoTemplate from "../retenciones.arrendamientoEnFideicomiso10";
describe("Retenciones arrendamiento en fideicomiso10", () => {
  it("Execute without params", () => {
    expect(arrendamientoEnFideicomisoTemplate()).toEqual({
      "arrendamientoenfideicomiso:Arrendamientoenfideicomiso": {
        position: "arrendamientoEnFideicomiso",
        attributes: [
          "version",
          "pagProvEfecPorFiduc",
          "rendimFideicom",
          "deduccCorresp",
          "montTotRet",
          "montResFiscDistFibras",
          "montOtrosConceptDistr",
          "descrMontOtrosConceptDistr",
        ]
      }
    });
  });

  it("Execute with minimalData true", () => {
    expect(
      arrendamientoEnFideicomisoTemplate({
        minimalData: true
      })
    ).toEqual({
      "arrendamientoenfideicomiso:Arrendamientoenfideicomiso": {
        position: "arrendamientoEnFideicomiso",
        attributes: ["version"]
      }
    });
  });

  it("Execute with minimalData false", () => {
    expect(
      arrendamientoEnFideicomisoTemplate({
        minimalData: false
      })
    ).toEqual({
      "arrendamientoenfideicomiso:Arrendamientoenfideicomiso": {
        position: "arrendamientoEnFideicomiso",
        attributes: [
          "version",
          "pagProvEfecPorFiduc",
          "rendimFideicom",
          "deduccCorresp",
          "montTotRet",
          "montResFiscDistFibras",
          "montOtrosConceptDistr",
          "descrMontOtrosConceptDistr",
        ]
      }
    });
  });
});
