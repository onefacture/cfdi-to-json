import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "implocal:ImpuestosLocales": {
    position: "impuestosLocales",
    attributes: ["totalDeRetenciones", "totalDeTraslados"]
  }
};

export const allDataDefinition = {
  "implocal:ImpuestosLocales": {
    position: "impuestosLocales",
    attributes: ["totalDeRetenciones", "totalDeTraslados"],
    nodes: {
      "implocal:RetencionesLocales": {
        strictArrayResponse: true,
        position: "retencionesLocales",
        attributes: ["impLocRetenido", "tasaDeRetencion", "importe"]
      },
      "implocal:TrasladosLocales": {
        strictArrayResponse: true,
        position: "trasladosLocales",
        attributes: ["impLocTrasladado", "tasaDeTraslado", "importe"]
      }
    }
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
