import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "plataformasTecnologicas:ServiciosPlataformasTecnologicas": {
    position: "plataformasTecnologicas",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
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
        strictArrayResponse: true,
        nodes: {
          "plataformasTecnologicas:DetallesDelServicio": {
            position: "detalles",
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

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
