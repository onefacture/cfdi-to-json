import { tMinimalData, tNamespace } from "../index.d";
export default (params: tNamespace) => {
  return {
    position: "impuestos",
    attributes: ["totalImpuestosRetenidos", "totalImpuestosTrasladados"],
    nodes: {
      [`${params.namespace ? params.namespace + ":" : ""}Traslados`]: {
        nodes: {
          [`${params.namespace ? params.namespace + ":" : ""}Traslado`]: {
            position: "traslados",
            strictArrayResponse: true,
            // Aplica tasa para cfdi v3.2
            attributes: [
              "impuesto",
              "tipoFactor",
              "tasaOCuota",
              "importe",
              "tasa"
            ]
          }
        }
      },
      [`${params.namespace ? params.namespace + ":" : ""}Retenciones`]: {
        nodes: {
          [`${params.namespace ? params.namespace + ":" : ""}Retencion`]: {
            position: "retenciones",
            strictArrayResponse: true,
            attributes: ["impuesto", "importe"]
          }
        }
      }
    }
  };
};
