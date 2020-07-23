import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "donat:Donatarias": {
    position: "donatarias",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "donat:Donatarias": {
    position: "donatarias",
    attributes: ["version", "noAutorizacion", "fechaAutorizacion", "leyenda"]
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
