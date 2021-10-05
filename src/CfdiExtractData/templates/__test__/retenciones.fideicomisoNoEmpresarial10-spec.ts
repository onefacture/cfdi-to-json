import fideicomisoNoEmpresarialTemplate from "../retenciones.fideicomisoNoEmpresarial10";
describe("Retenciones fideicomiso no empresarial10", () => {
  it("Execute without params", () => {
    expect(fideicomisoNoEmpresarialTemplate()).toEqual({
      "fideicomisonoempresarial:Fideicomisonoempresarial": {
        position: "fideicomisoNoEmpresarial",
        attributes: [ "version" ],
        nodes: {
          "fideicomisonoempresarial:IngresosOEntradas": {
            strictArrayResponse: true,
            position: "ingresosOEntradas",
            attributes: [
              "montTotEntradasPeriodo",
              "partPropAcumDelFideicom",
              "propDelMontTot",
            ],
            nodes: {
              "integracIngresos": {
                attributes: [ "concepto" ]
              }
            }
          },
          "fideicomisonoempresarial:DeduccOSalidas": {
            strictArrayResponse: true,
            position: "deduccOSalidas",
            attributes: [
              "montTotEgresPeriodo",
              "partPropDelFideicom",
              "propDelMontTot",
            ],
            nodes: {
              "IntegracEgresos": {
                attributes: [ "conceptoS" ]
              }
            }
          },
          "fideicomisonoempresarial:RetEfectFideicomiso": {
            strictArrayResponse: true,
            position: "retEfectFideicomiso",
            attributes: [
              "montRetRelPagFideic",
              "descRetRelPagFideic",
            ]
          },
        }
      }
    });
  });

  it("Execute with minimalData true", () => {
    expect(
      fideicomisoNoEmpresarialTemplate({
        minimalData: true
      })
    ).toEqual({
      "fideicomisonoempresarial:Fideicomisonoempresarial": {
        position: "fideicomisoNoEmpresarial",
        attributes: ["version"]
      }
    });
  });

  it("Execute with minimalData false", () => {
    expect(
      fideicomisoNoEmpresarialTemplate({
        minimalData: false
      })
    ).toEqual({
      "fideicomisonoempresarial:Fideicomisonoempresarial": {
        position: "fideicomisoNoEmpresarial",
        attributes: [ "version" ],
        nodes: {
          "fideicomisonoempresarial:IngresosOEntradas": {
            strictArrayResponse: true,
            position: "ingresosOEntradas",
            attributes: [
              "montTotEntradasPeriodo",
              "partPropAcumDelFideicom",
              "propDelMontTot",
            ],
            nodes: {
              "integracIngresos": {
                attributes: [ "concepto" ]
              }
            }
          },
          "fideicomisonoempresarial:DeduccOSalidas": {
            strictArrayResponse: true,
            position: "deduccOSalidas",
            attributes: [
              "montTotEgresPeriodo",
              "partPropDelFideicom",
              "propDelMontTot",
            ],
            nodes: {
              "IntegracEgresos": {
                attributes: [ "conceptoS" ]
              }
            }
          },
          "fideicomisonoempresarial:RetEfectFideicomiso": {
            strictArrayResponse: true,
            position: "retEfectFideicomiso",
            attributes: [
              "montRetRelPagFideic",
              "descRetRelPagFideic",
            ]
          },
        }
      }
    });
  });
});
