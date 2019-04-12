import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "pfic:PFintegranteCoordinado": {
        position: "pfIntegranteCoordinado",
        attributes: ["version"]
      }
    };
  }

  return {
    "pfic:PFintegranteCoordinado": {
      position: "pfIntegranteCoordinado",
      attributes: ["version", "claveVehicular", "placa", "RFCPF"]
    }
  };
};
