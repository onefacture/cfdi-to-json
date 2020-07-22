import dividendos10Template from "../retenciones.dividendos10";
describe("Aerolineas data test", () => {
  it("Execute without params", () => {
    expect(dividendos10Template()).toEqual({
      "dividendos:Dividendos": {
        position: "dividendos",
        attributes: [ "version" ],
        nodes: {
          "dividendos:DividOUtil": {
            strictArrayResponse: true,
            position: "arrayDividOUtil",
            attributes: [
              "cveTipDivOUtil",
              "montISRAcredRetMexico",
              "montISRAcredRetExtranjero",
              "montRetExtDivExt",
              "tipoSocDistrDiv",
              "montISRAcredNal",
              "montDivAcumNal",
              "montDivAcumExt",
            ]
          },
          "dividendos:Remanente": {
            strictArrayResponse: true,
            position: "arrayRemanentes",
            attributes: [
              "proporcionRem"
            ]
          },
        }
      }
    });
  });

  it("Execute with minimalData true", () => {
    expect(
      dividendos10Template({
        minimalData: true
      })
    ).toEqual({
        "dividendos:Dividendos": {
          position: "dividendos",
          attributes: ["version"]
        }
    });
  });

  it("Execute with minimalData false", () => {
    expect(
      dividendos10Template({
        minimalData: false
      })
    ).toEqual({
      "dividendos:Dividendos": {
        position: "dividendos",
        attributes: [ "version" ],
        nodes: {
          "dividendos:DividOUtil": {
            strictArrayResponse: true,
            position: "arrayDividOUtil",
            attributes: [
              "cveTipDivOUtil",
              "montISRAcredRetMexico",
              "montISRAcredRetExtranjero",
              "montRetExtDivExt",
              "tipoSocDistrDiv",
              "montISRAcredNal",
              "montDivAcumNal",
              "montDivAcumExt",
            ]
          },
          "dividendos:Remanente": {
            strictArrayResponse: true,
            position: "arrayRemanentes",
            attributes: [
              "proporcionRem"
            ]
          },
        }
      }
    });
  });
});
