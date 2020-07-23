import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "vehiculousado:VehiculoUsado": {
    position: "vehiculoUsado",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "vehiculousado:VehiculoUsado": {
    position: "vehiculoUsado",
    attributes: [
      "version",
      "montoAdquisicion",
      "montoEnajenacion",
      "claveVehicular",
      "marca",
      "tipo",
      "modelo",
      "numeroMotor",
      "numeroSerie",
      "niv",
      "valor"
    ],
    nodes: {
      "vehiculousado:InformacionAduanera": {
        position: "informacionAduanera",
        attributes: ["numero", "fecha", "aduana"]
      }
    }
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
