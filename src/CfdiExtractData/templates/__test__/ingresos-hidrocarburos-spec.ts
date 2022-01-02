import ingresosHidrocarburosTemplate from "../ingresos-hidrocarburos";
describe("Ingresos hidrocarburos data test", () => {
  it("Execute without params", () => {
    expect(ingresosHidrocarburosTemplate()).toEqual({
      "IngresosHidrocarburos": {
        position: "ingresosHidrocarburos",
        attributes: ["version", "numeroContrato", "contraprestacionPagadaOperador", "porcentaje"],
        nodes: {
          "DocumentoRelacionado": {
            position: "otrosCargos",
            attributes: ["totalCargos"],
          }
        }
      }
    });
  });

  it("Execute with minimalData true", () => {
    expect(
      ingresosHidrocarburosTemplate({
        minimalData: true
      })
    ).toEqual({
      "IngresosHidrocarburos": {
        position: "ingresosHidrocarburos",
        attributes: ["version"]
      }
    });
  });

  it("Execute with minimalData false", () => {
    expect(
      ingresosHidrocarburosTemplate({
        minimalData: false
      })
    ).toEqual({
      "IngresosHidrocarburos": {
        position: "ingresosHidrocarburos",
        attributes: ["version", "numeroContrato", "contraprestacionPagadaOperador", "porcentaje"],
        nodes: {
          "DocumentoRelacionado": {
            position: "otrosCargos",
            attributes: ["totalCargos"],
          }
        }
      }
    });
  });
});
