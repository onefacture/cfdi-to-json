import conceptosTercerosTemplate, {
  informacionAduaneraDefinition
} from "../conceptos.terceros";
describe("Conceptos de terceros data test", () => {
  it("Execute without params", () => {
    expect(conceptosTercerosTemplate()).toEqual({
      "terceros:PorCuentadeTerceros": {
        position: "cuentaTerceros",
        attributes: ["version", "rfc", "nombre"],
        nodes: Object.assign({}, informacionAduaneraDefinition, {
          "terceros:Parte": {
            strictArrayResponse: true,
            position: "partes",
            attributes: [
              "cantidad",
              "unidad",
              "noIdentificacion",
              "descripcion",
              "valorUnitario",
              "importe"
            ],
            nodes: informacionAduaneraDefinition
          },
          "terceros:CuentaPredial": {
            position: "cuentaPredial",
            attributes: ["numero"]
          }
        })
      }
    });
  });
  it("Execute with minimalData: false", () => {
    expect(conceptosTercerosTemplate({ minimalData: false })).toEqual({
      "terceros:PorCuentadeTerceros": {
        position: "cuentaTerceros",
        attributes: ["version", "rfc", "nombre"],
        nodes: Object.assign({}, informacionAduaneraDefinition, {
          "terceros:Parte": {
            strictArrayResponse: true,
            position: "partes",
            attributes: [
              "cantidad",
              "unidad",
              "noIdentificacion",
              "descripcion",
              "valorUnitario",
              "importe"
            ],
            nodes: informacionAduaneraDefinition
          },
          "terceros:CuentaPredial": {
            position: "cuentaPredial",
            attributes: ["numero"]
          }
        })
      }
    });
  });
  it("Execute with minimalData: true", () => {
    expect(conceptosTercerosTemplate({ minimalData: true })).toEqual({
      "terceros:PorCuentadeTerceros": {
        position: "cuentaTerceros",
        attributes: ["version"]
      }
    });
  });
});
