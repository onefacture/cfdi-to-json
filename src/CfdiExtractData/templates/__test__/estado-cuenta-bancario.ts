import ecbEstadoDeCuentaBancario from "../estado-cuenta-bancario";
describe("Estado de cuenta de combustible 10 data test", () => {
  it("Execute without params", () => {
    expect(ecbEstadoDeCuentaBancario()).toEqual({
      "ecb:EstadoDeCuentaBancario": {
        position: "estadoCuentaBancario",
        attributes: ["version", "numeroCuenta", "nombreCliente", "periodo", "sucursal"],
        nodes: {
          "ecb:Movimientos": {
            "ecb:MovimientoECB": {
              strictArrayResponse: true,
              position: "movimientosECB",
              attributes: [
                "fecha",
                "referencia",
                "descripcion",
                "importe",
                "moneda",
                "saldoInicial",
                "saldoAlCorte",
              ],
            },
            "ecb:MovimientoECBFiscal": {
              strictArrayResponse: true,
              position: "movimientosECBFiscal",
              attributes: [
                "fecha",
                "referencia",
                "descripcion",
                "RFCenajenante",
                "moneda",
                "saldoInicial",
                "saldoAlCorte",
              ],
            },
          },
        }
      }
    });
  });
  it("Execute with minimalData: False", () => {
    expect(ecbEstadoDeCuentaBancario({ minimalData: false })).toEqual({
      "ecb:EstadoDeCuentaBancario": {
        position: "estadoCuentaBancario",
        attributes: ["version", "numeroCuenta", "nombreCliente", "periodo", "sucursal"],
        nodes: {
          "ecb:Movimientos": {
            "ecb:MovimientoECB": {
              strictArrayResponse: true,
              position: "movimientosECB",
              attributes: [
                "fecha",
                "referencia",
                "descripcion",
                "importe",
                "moneda",
                "saldoInicial",
                "saldoAlCorte",
              ],
            },
            "ecb:MovimientoECBFiscal": {
              strictArrayResponse: true,
              position: "movimientosECBFiscal",
              attributes: [
                "fecha",
                "referencia",
                "descripcion",
                "RFCenajenante",
                "moneda",
                "saldoInicial",
                "saldoAlCorte",
              ],
            },
          },
        }
      }
    });
  });
  it("Execute with minimalData: True", () => {
    expect(ecbEstadoDeCuentaBancario({ minimalData: true })).toEqual({
      "ecb:EstadoDeCuentaBancario": {
        position: "estadoCuentaBancario",
        attributes: ["version"]
      }
    });
  });
});
