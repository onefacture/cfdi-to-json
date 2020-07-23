import { tMinimalData } from "../index.d";

export const informacionAduaneraDefinition = {
  "ventavehiculos:InformacionAduanera": {
    position: "informacionAduanera",
    attributes: ["numero", "fecha", "aduana"]
  }
};

export const minimalDataDefinition = {
  "ventavehiculos:VentaVehiculos": {
    position: "ventaVehiculos",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "ventavehiculos:VentaVehiculos": {
    position: "ventaVehiculos",
    attributes: ["version", "claveVehicular", "niv"],
    nodes: Object.assign({}, informacionAduaneraDefinition, {
      "ventavehiculos:Parte": {
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
      }
    })
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
