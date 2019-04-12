import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "ecc12:EstadoDeCuentaCombustible": {
        position: "estadoCuentaCombustibles",
        attributes: ["version"]
      }
    };
  }

  return {
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
  };
};
