import pagosAExtranjerosTemplate from "../retenciones.pagosAExtranjeros10";
describe("Aerolineas data test", () => {
  it("Execute without params", () => {
    expect(pagosAExtranjerosTemplate()).toEqual({
      "pagosaextranjeros:Pagosaextranjeros": {
        position: "pagosAExtranjeros",
        attributes: [ "version", "esBenefEfectDelCobro" ],
        nodes: {
          "pagosaextranjeros:NoBeneficiario": {
            strictArrayResponse: true,
            position: "noBeneficiarios",
            attributes: [
              "paisDeResidParaEfecFisc",
              "conceptoPago",
              "descripcionConcepto",
            ],
          },
          "pagosaextranjeros:Beneficiario": {
            strictArrayResponse: true,
            position: "beneficiarios",
            attributes: [
              "rfc",
              "curp",
              "nomDenRazSocB",
              "conceptoPago",
              "descripcionConcepto",
            ],
          },
        }
      }
    });
  });

  it("Execute with minimalData true", () => {
    expect(
      pagosAExtranjerosTemplate({
        minimalData: true
      })
    ).toEqual({
      "pagosaextranjeros:Pagosaextranjeros": {
        position: "pagosAExtranjeros",
        attributes: ["version"]
      }
    });
  });

  it("Execute with minimalData false", () => {
    expect(
      pagosAExtranjerosTemplate({
        minimalData: false
      })
    ).toEqual({
      "pagosaextranjeros:Pagosaextranjeros": {
        position: "pagosAExtranjeros",
        attributes: [ "version", "esBenefEfectDelCobro" ],
        nodes: {
          "pagosaextranjeros:NoBeneficiario": {
            strictArrayResponse: true,
            position: "noBeneficiarios",
            attributes: [
              "paisDeResidParaEfecFisc",
              "conceptoPago",
              "descripcionConcepto",
            ],
          },
          "pagosaextranjeros:Beneficiario": {
            strictArrayResponse: true,
            position: "beneficiarios",
            attributes: [
              "rfc",
              "curp",
              "nomDenRazSocB",
              "conceptoPago",
              "descripcionConcepto",
            ],
          },
        }
      }
    });
  });
});
