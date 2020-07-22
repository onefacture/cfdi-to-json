import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "plataformasTecnologicas:ServiciosPlataformasTecnologicas": {
        position: "plataformasTecnologicas",
        attributes: ["version"]
      }
    };
  }

  return {
    "plataformasTecnologicas:ServiciosPlataformasTecnologicas": {
      position: "plataformasTecnologicas",
      attributes: [
        'version', 'periodicidad', 'numServ', 'monTotServSIVA',
        'totalIVATrasladado', 'totalIVARetenido', 'totalISRRetenido',
        'difIVAEntregadoPrestServ', 'monTotalporUsoPlataforma', 'MonTotalContribucionGubernamental'
      ],
      nodes: {
        "plataformasTecnologicas:Servicios": {
          position: 'servicios',
          nodes: {
            "plataformasTecnologicas:DetallesDelServicio": {
              strictArrayResponse: true,
              attributes: [
                'formaPagoServ', 'tipoDeServ', 'subTipServ',
                'RFCTerceroAutorizado', 'fechaServ', 'precioServSinIVA'
              ],
              nodes: {
                "plataformasTecnologicas:ImpuestosTrasladadosdelServicio": {
                  strictArrayResponse: true,
                  position: 'traslados',
                  attributes: [ 'base', 'impuesto', 'tipoFactor', 'tasaCuota', 'importe' ],
                },
                "plataformasTecnologicas:ContribucionGubernamental": {
                  strictArrayResponse: true,
                  position: 'contribucionesGubernamentales',
                  attributes: [ 'impContrib', 'entidadDondePagaLaContribucion' ],
                },
                "plataformasTecnologicas:ComisionDelServicio": {
                  strictArrayResponse: true,
                  position: 'comisionesDelServicio',
                  attributes: [ 'base', 'porcentaje', 'importe' ]
                }
              }
            }
          }
        }
      }
    }
  };
};
