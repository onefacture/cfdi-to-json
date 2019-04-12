import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  return {
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
};
