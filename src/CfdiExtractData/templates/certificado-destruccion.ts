import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
	"destruccion:certificadodedestruccion": {
    position: "certificadoDestruccion",
    attributes: ["version", "serie", "numFolDesVeh"]
  }
};

export const allDataDefinition = minimalDataDefinition;

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
