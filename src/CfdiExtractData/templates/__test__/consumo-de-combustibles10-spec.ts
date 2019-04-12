import consumoCombustibles10Template from "../consumo-de-combustibles10";
describe("Consumo de combustible 10 data test", () => {
  it("Execute without params", () => {
    expect(consumoCombustibles10Template()).toEqual({
      "consumodecombustibles:ConsumoDeCombustibles": {
        position: "consumoDeCombustibles",
        attributes: [
          "version",
          "tipoOperacion",
          "numeroDeCuenta",
          "subTotal",
          "total"
        ],
        nodes: {
          "consumodecombustibles:Conceptos": {
            nodes: {
              "consumodecombustibles:ConceptoConsumoDeCombustibles": {
                strictArrayResponse: true,
                position: "conceptos",
                attributes: [
                  "identificador",
                  "fecha",
                  "rfc",
                  "claveEstacion",
                  "cantidad",
                  "nombreCombustible",
                  "folioOperacion",
                  "valorUnitario",
                  "importe"
                ],
                nodes: {
                  "consumodecombustibles:Determinados": {
                    nodes: {
                      "consumodecombustibles:Determinado": {
                        strictArrayResponse: true,
                        position: "determinados",
                        attributes: ["impuesto", "tasa", "importe"]
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  });
  it("Execute with minimalData: False", () => {
    expect(consumoCombustibles10Template({ minimalData: false })).toEqual({
      "consumodecombustibles:ConsumoDeCombustibles": {
        position: "consumoDeCombustibles",
        attributes: [
          "version",
          "tipoOperacion",
          "numeroDeCuenta",
          "subTotal",
          "total"
        ],
        nodes: {
          "consumodecombustibles:Conceptos": {
            nodes: {
              "consumodecombustibles:ConceptoConsumoDeCombustibles": {
                strictArrayResponse: true,
                position: "conceptos",
                attributes: [
                  "identificador",
                  "fecha",
                  "rfc",
                  "claveEstacion",
                  "cantidad",
                  "nombreCombustible",
                  "folioOperacion",
                  "valorUnitario",
                  "importe"
                ],
                nodes: {
                  "consumodecombustibles:Determinados": {
                    nodes: {
                      "consumodecombustibles:Determinado": {
                        strictArrayResponse: true,
                        position: "determinados",
                        attributes: ["impuesto", "tasa", "importe"]
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  });
  it("Execute with minimalData: True", () => {
    expect(consumoCombustibles10Template({ minimalData: true })).toEqual({
      "consumodecombustibles:ConsumoDeCombustibles": {
        position: "consumoDeCombustibles",
        attributes: ["version"]
      }
    });
  });
});
