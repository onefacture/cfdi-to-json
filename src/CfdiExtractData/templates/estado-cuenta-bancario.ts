import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "ecb:EstadoDeCuentaBancario": {
    position: "estadoCuentaBancario",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
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
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
