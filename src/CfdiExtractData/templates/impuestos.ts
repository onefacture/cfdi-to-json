import { tMinimalData, tNamespace } from "../index.d";
export default (params?: tNamespace) => {
  var finalNamespace = params && params.namespace ? params.namespace + ":" : "";
  return {
    position: "impuestos",
    attributes: ["totalImpuestosRetenidos", "totalImpuestosTrasladados"],
    nodes: {
      [`${finalNamespace}Traslados`]: {
        nodes: {
          [`${finalNamespace}Traslado`]: {
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
      [`${finalNamespace}Retenciones`]: {
        nodes: {
          [`${finalNamespace}Retencion`]: {
            position: "retenciones",
            strictArrayResponse: true,
            attributes: ["impuesto", "importe"]
          }
        }
      }
    }
  };
};
