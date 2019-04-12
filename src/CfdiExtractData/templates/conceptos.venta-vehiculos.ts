import { tMinimalData } from "../index.d";
export const informacionAduaneraDefinition = {
  "ventavehiculos:InformacionAduanera": {
    position: "informacionAduanera",
    attributes: ["numero", "fecha", "aduana"]
  }
};
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "ventavehiculos:VentaVehiculos": {
        position: "ventaVehiculos",
        attributes: ["version"]
      }
    };
  }
  return {
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
};
