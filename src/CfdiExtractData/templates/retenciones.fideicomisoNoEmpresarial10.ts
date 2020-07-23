import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "fideicomisonoempresarial:Fideicomisonoempresarial": {
    position: "fideicomisoNoEmpresarial",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "fideicomisonoempresarial:Fideicomisonoempresarial": {
    position: "fideicomisoNoEmpresarial",
    attributes: [ "version" ],
    nodes: {
      "fideicomisonoempresarial:IngresosOEntradas": {
        strictArrayResponse: true,
        position: "ingresosOEntradas",
        attributes: [
          "montTotEntradasPeriodo",
          "partPropAcumDelFideicom",
          "propDelMontTot",
        ],
        nodes: {
          "integracIngresos": {
            attributes: [ "concepto" ]
          }
        }
      },
      "fideicomisonoempresarial:DeduccOSalidas": {
        strictArrayResponse: true,
        position: "deduccOSalidas",
        attributes: [
          "montTotEgresPeriodo",
          "partPropDelFideicom",
          "propDelMontTot",
        ],
        nodes: {
          "IntegracEgresos": {
            attributes: [ "conceptoS" ]
          }
        }
      },
      "fideicomisonoempresarial:RetEfectFideicomiso": {
        strictArrayResponse: true,
        position: "retEfectFideicomiso",
        attributes: [
          "montRetRelPagFideic",
          "descRetRelPagFideic",
        ]
      },
    }
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
