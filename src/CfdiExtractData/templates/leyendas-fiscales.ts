import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "leyendasFisc:LeyendasFiscales": {
    position: "leyendasFiscales",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "leyendasFisc:LeyendasFiscales": {
    position: "leyendasFiscales",
    attributes: ["version"],
    nodes: {
      "leyendasFisc:Leyenda": {
        strictArrayResponse: true,
        position: "leyendasArray",
        attributes: ["disposicionFiscal", "norma", "textoLeyenda"]
      }
    }
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
