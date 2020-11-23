import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "pfic:PFintegranteCoordinado": {
    position: "pfIntegranteCoordinado",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "pfic:PFintegranteCoordinado": {
    position: "pfIntegranteCoordinado",
    attributes: ["version", "claveVehicular", "placa", "RFCPF"]
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
