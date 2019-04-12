import edoCtaCombustible12 from "../estado-cuenta-combustible12";
describe("Estado de cuenta de combustible 12 data test", () => {
  it("Execute without params", () => {
    expect(edoCtaCombustible12()).toEqual({
      "ecc12:EstadoDeCuentaCombustible": {
        position: "estadoCuentaCombustibles",
        attributes: [
          "version",
          "tipoOperacion",
          "numeroDeCuenta",
          "subTotal",
          "total"
        ],
        nodes: {
          "ecc12:Conceptos": {
            strictArrayResponse: true,
            position: "conceptos",
            nodes: {
              "ecc12:ConceptoEstadoDeCuentaCombustible": {
                attributes: [
                  "identificador",
                  "fecha",
                  "rfc",
                  "claveEstacion",
                  "cantidad",
                  "tipoCombustible",
                  "unidad",
                  "nombreCombustible",
                  "folioOperacion",
                  "valorUnitario",
                  "importe"
                ],
                nodes: {
                  "ecc12:Traslados": {
                    nodes: {
                      "ecc12:Traslado": {
                        strictArrayResponse: true,
                        position: "traslados",
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
    expect(edoCtaCombustible12({ minimalData: false })).toEqual({
      "ecc12:EstadoDeCuentaCombustible": {
        position: "estadoCuentaCombustibles",
        attributes: [
          "version",
          "tipoOperacion",
          "numeroDeCuenta",
          "subTotal",
          "total"
        ],
        nodes: {
          "ecc12:Conceptos": {
            strictArrayResponse: true,
            position: "conceptos",
            nodes: {
              "ecc12:ConceptoEstadoDeCuentaCombustible": {
                attributes: [
                  "identificador",
                  "fecha",
                  "rfc",
                  "claveEstacion",
                  "cantidad",
                  "tipoCombustible",
                  "unidad",
                  "nombreCombustible",
                  "folioOperacion",
                  "valorUnitario",
                  "importe"
                ],
                nodes: {
                  "ecc12:Traslados": {
                    nodes: {
                      "ecc12:Traslado": {
                        strictArrayResponse: true,
                        position: "traslados",
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
    expect(edoCtaCombustible12({ minimalData: true })).toEqual({
      "ecc12:EstadoDeCuentaCombustible": {
        position: "estadoCuentaCombustibles",
        attributes: ["version"]
      }
    });
  });
});
