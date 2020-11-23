import { tMinimalData } from "../index.d";

export const informacionAduaneraDefinition = {
  "terceros:InformacionAduanera": {
    position: "informacionAduanera",
    attributes: ["numero", "fecha", "aduana"]
  }
};

export const minimalDataDefinition = {
  "terceros:PorCuentadeTerceros": {
    position: "cuentaTerceros",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
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
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
