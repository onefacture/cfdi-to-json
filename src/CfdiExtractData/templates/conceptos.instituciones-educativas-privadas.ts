import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "iedu:instEducativas": {
    position: "instEducativa",
    attributes: [
      "version",
      "nombreAlumno",
      "curp",
      "nivelEducativo",
      "autRVOE",
      "rfcPago"
    ]
  }
};

export const allDataDefinition = minimalDataDefinition;

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
