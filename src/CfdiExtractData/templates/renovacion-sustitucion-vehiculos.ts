import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
    "decreto:renovacionysustitucionvehiculos": {
      position: "renovacionSustitucionVehiculos",
      attributes: ["version"]
    }
};

export const allDataDefinition = {
  "decreto:renovacionysustitucionvehiculos": {
    position: "renovacionSustitucionVehiculos",
    attributes: ["version", "tipoDeDecreto"]
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
