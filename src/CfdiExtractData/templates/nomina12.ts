import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "nomina12:Nomina": {
    strictArrayResponse: true,
    position: "nominas",
    attributes: ["version"]
  },
  "Nomina": {
    strictArrayResponse: true,
    position: "nominas",
    attributes: ["version"]
  }
};

function getNominaDefinition(params: { useNamespace: any }) {
  let { useNamespace } = params;

  return {
    [`${useNamespace ? 'nomina12:' : ''}Nomina`]: {
      strictArrayResponse: true,
      position: "nominas",
      attributes: [
        "version",
        "tipoNomina",
        "fechaPago",
        "fechaInicialPago",
        "fechaFinalPago",
        "numDiasPagados",
        "totalPercepciones",
        "totalDeducciones",
        "totalOtrosPagos"
      ],
      nodes: {
        [`${useNamespace ? 'nomina12:' : ''}Emisor`]: {
          position: "emisor",
          attributes: ["curp", "registroPatronal", "rfcPatronOrigen"],
          nodes: {
            [`${useNamespace ? 'nomina12:' : ''}EntidadSNCF`]: {
              position: "entidades",
              strictArrayResponse: true,
              attributes: ["origenRecurso", "montoRecursoPropio"]
            }
          }
        },
        [`${useNamespace ? 'nomina12:' : ''}Receptor`]: {
          position: "receptor",
          attributes: [
            "curp",
            "tipoContrato",
            "tipoRegimen",
            "numEmpleado",
            "periodicidadPago",
            "claveEntFed",
            "numSeguridadSocial",
            "fechaInicioRelLaboral",
            "antigüedad",
            "sindicalizado",
            "tipoJornada",
            "departamento",
            "puesto",
            "riesgoPuesto",
            "banco",
            "cuentaBancaria",
            "salarioBaseCotApor",
            "salarioDiarioIntegrado"
          ],
          nodes: {
            [`${useNamespace ? 'nomina12:' : ''}SubContratacion`]: {
              position: "subContrataciones",
              strictArrayResponse: true,
              attributes: ["rfcLabora", "porcentajeTiempo"]
            }
          }
        },
        [`${useNamespace ? 'nomina12:' : ''}Percepciones`]: {
          position: "percepciones",
          attributes: [
            "totalGravado",
            "totalExento",
            "totalJubilacionPensionRetiro",
            "totalSeparacionIndemnizacion",
            "totalSueldos"
          ],
          nodes: {
            [`${useNamespace ? 'nomina12:' : ''}Percepcion`]: {
              position: "arrayPercepciones",
              strictArrayResponse: true,
              attributes: [
                "tipoPercepcion",
                "clave",
                "concepto",
                "importeGravado",
                "importeExento"
              ],
              nodes: {
                [`${useNamespace ? 'nomina12:' : ''}HorasExtra`]: {
                  position: "horasExtra",
                  strictArrayResponse: true,
                  attributes: [
                    "dias",
                    "tipoHoras",
                    "horasExtra",
                    "importePagado"
                  ]
                }
              }
            },
            [`${useNamespace ? 'nomina12:' : ''}JubilacionPensionRetiro`]: {
              position: "arrayJubilacionPensionRetiro",
              strictArrayResponse: true,
              attributes: [
                "totalUnaExhibicion",
                "totalParcialidad",
                "montoDiario",
                "ingresoAcumulable",
                "ingresoNoAcumulable"
              ]
            },
            [`${useNamespace ? 'nomina12:' : ''}SeparacionIndemnizacion`]: {
              position: "arraySeparacionIndemnizacion",
              strictArrayResponse: true,
              attributes: [
                "totalPagado",
                "numAñosServicio",
                "ultimoSueldoMensOrd",
                "ingresoAcumulable",
                "IngresoNoAcumulable"
              ]
            }
          }
        },
        [`${useNamespace ? 'nomina12:' : ''}OtrosPagos`]: {
          nodes: {
            [`${useNamespace ? 'nomina12:' : ''}OtroPago`]: {
              position: "otrosPagos",
              strictArrayResponse: true,
              attributes: ["tipoOtroPago", "clave", "concepto", "importe"],
              nodes: {
                [`${useNamespace ? 'nomina12:' : ''}SubsidioAlEmpleo`]: {
                    attributes: ["subsidioCausado"],
                },
                [`${useNamespace ? 'nomina12:' : ''}CompensacionSaldosAFavor`]: {
                    attributes: ["saldoAFavor", "remanenteSalFav"],
                }
              }
            }
          }
        },
        [`${useNamespace ? 'nomina12:' : ''}Deducciones`]: {
          position: "deducciones",
          attributes: ["totalOtrasDeducciones", "totalImpuestosRetenidos"],
          nodes: {
            [`${useNamespace ? 'nomina12:' : ''}Deduccion`]: {
              position: "arrayDeducciones",
              strictArrayResponse: true,
              attributes: ["tipoDeduccion", "clave", "concepto", "importe"]
            }
          }
        },
        [`${useNamespace ? 'nomina12:' : ''}Incapacidades`]: {
          nodes: {
            [`${useNamespace ? 'nomina12:' : ''}Incapacidad`]: {
              position: "incapacidades",
              strictArrayResponse: true,
              attributes: [
                "diasIncapacidad",
                "tipoIncapacidad",
                "importeMonetario"
              ]
            }
          }
        }
      }
    }
  };
}

export const allDataDefinition = {
  ...getNominaDefinition({ useNamespace: false }),
  ...getNominaDefinition({ useNamespace: true }),
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
