import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "fideicomisonoempresarial:Fideicomisonoempresarial": {
        position: "fideicomisoNoEmpresarial",
        attributes: ["version"]
      }
    };
  }

  return {
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
};
