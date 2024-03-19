import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  'CfdiRelacionados': {
        position:   'relacionados',
        attributes: ['tipoRelacion'],
        strictArrayResponse: true,
        nodes: {
            'CfdiRelacionado': {
                position: 'uuids',
                strictArrayResponse: true,
                attributes: ['uuid']
            }
        }
    },
};

export const allDataDefinition = {
  'CfdiRelacionados': {
        position:   'relacionados',
        attributes: ['tipoRelacion'],
        strictArrayResponse: true,
        nodes: {
            'CfdiRelacionado': {
                position: 'uuids',
                strictArrayResponse: true,
                attributes: ['uuid']
            }
        }
    },
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
