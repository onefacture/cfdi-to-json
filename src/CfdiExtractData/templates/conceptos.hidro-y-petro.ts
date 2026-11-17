import { tMinimalData } from '../index.d';

export const minimalDataDefinition = {
    'HidroYPetro': {
        position: 'hidroYPetro',
        attributes: ['tipoPermiso', 'subProductoHYP']
    }
};

export const allDataDefinition = minimalDataDefinition;

export default (params?: tMinimalData) =>
    params && params.minimalData ? minimalDataDefinition : allDataDefinition;
