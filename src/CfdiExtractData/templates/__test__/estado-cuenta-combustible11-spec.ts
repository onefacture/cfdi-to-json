import esdoCtaCombustible11 from "../estado-cuenta-combustible11";
describe("Estado de cuenta de combustible 11 data test", () => {
  it("Execute without params", () => {
    expect(esdoCtaCombustible11()).toEqual({
      "ecc11:EstadoDeCuentaCombustible": {
        position: "estadoCuentaCombustibles",
        attributes: [
          "version",
          "tipoOperacion",
          "numeroDeCuenta",
          "subTotal",
          "total"
        ],
        nodes: {
          "ecc11:Conceptos": {
            strictArrayResponse: true,
            position: "conceptos",
            nodes: {
              "ecc11:ConceptoEstadoDeCuentaCombustible": {
                attributes: [
                  "identificador",
                  "fecha",
                  "rfc",
                  "claveEstacion",
                  "tar",
                  "cantidad",
                  "noIdentificacion",
                  "unidad",
                  "nombreCombustible",
                  "folioOperacion",
                  "valorUnitario",
                  "importe"
                ],
                nodes: {
                  "ecc11:Traslados": {
                    nodes: {
                      "ecc11:Traslado": {
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
    expect(esdoCtaCombustible11({ minimalData: false })).toEqual({
      "ecc11:EstadoDeCuentaCombustible": {
        position: "estadoCuentaCombustibles",
        attributes: [
          "version",
          "tipoOperacion",
          "numeroDeCuenta",
          "subTotal",
          "total"
        ],
        nodes: {
          "ecc11:Conceptos": {
            strictArrayResponse: true,
            position: "conceptos",
            nodes: {
              "ecc11:ConceptoEstadoDeCuentaCombustible": {
                attributes: [
                  "identificador",
                  "fecha",
                  "rfc",
                  "claveEstacion",
                  "tar",
                  "cantidad",
                  "noIdentificacion",
                  "unidad",
                  "nombreCombustible",
                  "folioOperacion",
                  "valorUnitario",
                  "importe"
                ],
                nodes: {
                  "ecc11:Traslados": {
                    nodes: {
                      "ecc11:Traslado": {
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
    expect(esdoCtaCombustible11({ minimalData: true })).toEqual({
      "ecc11:EstadoDeCuentaCombustible": {
        position: "estadoCuentaCombustibles",
        attributes: ["version", "total"]
      }
    });
  });
});
