import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "aieps:acreditamientoIEPS": {
    postion: "acreditamientoIEPS",
    attributes: ["version", "tar"]
  }
};

export const allDataDefinition = minimalDataDefinition;

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
