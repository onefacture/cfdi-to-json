import consumoCombustibles11Template from "../consumo-de-combustibles11";
describe("Consumo de combustible 11 data test", () => {
  it("Execute without params", () => {
    expect(consumoCombustibles11Template()).toEqual({
      "consumodecombustibles11:ConsumoDeCombustibles": {
        position: "consumoDeCombustibles",
        attributes: [
          "version",
          "tipoOperacion",
          "numeroDeCuenta",
          "subTotal",
          "total"
        ],
        nodes: {
          "consumodecombustibles11:Conceptos": {
            nodes: {
              "consumodecombustibles11:ConceptoConsumoDeCombustibles": {
                strictArrayResponse: true,
                position: "conceptos",
                attributes: [
                  "identificador",
                  "fecha",
                  "rfc",
                  "claveEstacion",
                  "tipoCombustible",
                  "cantidad",
                  "nombreCombustible",
                  "folioOperacion",
                  "valorUnitario",
                  "importe"
                ],
                nodes: {
                  "consumodecombustibles11:Determinados": {
                    nodes: {
                      "consumodecombustibles11:Determinado": {
                        strictArrayResponse: true,
                        position: "determinados",
                        attributes: ["impuesto", "tasaOCuota", "importe"]
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
    expect(consumoCombustibles11Template({ minimalData: false })).toEqual({
      "consumodecombustibles11:ConsumoDeCombustibles": {
        position: "consumoDeCombustibles",
        attributes: [
          "version",
          "tipoOperacion",
          "numeroDeCuenta",
          "subTotal",
          "total"
        ],
        nodes: {
          "consumodecombustibles11:Conceptos": {
            nodes: {
              "consumodecombustibles11:ConceptoConsumoDeCombustibles": {
                strictArrayResponse: true,
                position: "conceptos",
                attributes: [
                  "identificador",
                  "fecha",
                  "rfc",
                  "claveEstacion",
                  "tipoCombustible",
                  "cantidad",
                  "nombreCombustible",
                  "folioOperacion",
                  "valorUnitario",
                  "importe"
                ],
                nodes: {
                  "consumodecombustibles11:Determinados": {
                    nodes: {
                      "consumodecombustibles11:Determinado": {
                        strictArrayResponse: true,
                        position: "determinados",
                        attributes: ["impuesto", "tasaOCuota", "importe"]
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
    expect(consumoCombustibles11Template({ minimalData: true })).toEqual({
      "consumodecombustibles11:ConsumoDeCombustibles": {
        position: "consumoDeCombustibles",
        attributes: ["version"]
      }
    });
  });
});
