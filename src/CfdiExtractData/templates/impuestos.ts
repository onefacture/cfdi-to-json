import { tMinimalData } from '../index.d';
export default () => {
  return {
    position: 'impuestos',
    attributes: ['totalImpuestosRetenidos', 'totalImpuestosTrasladados'],
    nodes: {
      'Traslados': {
        nodes: {
          'Traslado': {
            position: 'traslados',
            strictArrayResponse: true,
            // Aplica tasa para cfdi v3.2
            attributes: [
              'impuesto',
              'tipoFactor',
              /*'tasaOCuota',
              'importe',
              'tasa'*/
            ],
            parseToFloat: [ 'importe', 'tasaOCuota', 'tasa', 'base' ]
          }
        }
      },
      'Retenciones': {
        nodes: {
          'Retencion': {
            position: 'retenciones',
            strictArrayResponse: true,
            attributes: ['impuesto', /*'importe'*/],
            parseToFloat: [ 'importe' ]
          }
        }
      }
    }
  };
};
