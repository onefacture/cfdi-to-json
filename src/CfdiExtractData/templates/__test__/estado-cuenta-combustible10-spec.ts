import edoCtaCombustible10 from "../estado-cuenta-combustible10";
describe("Estado de cuenta de combustible 10 data test", () => {
  it("Execute without params", () => {
    expect(edoCtaCombustible10()).toEqual({
      "ecc:EstadoDeCuentaCombustible": {
        position: "estadoCuentaCombustibles",
        attributes: ["tipoOperacion", "numeroDeCuenta", "subTotal", "total"],
        nodes: {
          "ecc:Conceptos": {
            nodes: {
              "ecc:ConceptoEstadoDeCuentaCombustible": {
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
                  "ecc:Traslados": {
                    nodes: {
                      "ecc:Traslado": {
                        strictArrayResponse: true,
                        position: "traslados",
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
    expect(edoCtaCombustible10({ minimalData: false })).toEqual({
      "ecc:EstadoDeCuentaCombustible": {
        position: "estadoCuentaCombustibles",
        attributes: ["tipoOperacion", "numeroDeCuenta", "subTotal", "total"],
        nodes: {
          "ecc:Conceptos": {
            nodes: {
              "ecc:ConceptoEstadoDeCuentaCombustible": {
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
                  "ecc:Traslados": {
                    nodes: {
                      "ecc:Traslado": {
                        strictArrayResponse: true,
                        position: "traslados",
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
    expect(edoCtaCombustible10({ minimalData: true })).toEqual({
      "ecc:EstadoDeCuentaCombustible": {
        position: "estadoCuentaCombustibles",
        attributes: ["subTotal", "total"]
      }
    });
  });
});
