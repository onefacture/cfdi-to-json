import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "Nomina": {
    strictArrayResponse: true,
    position: "nominas",
    version: '1.2',
    attributes: ["version"]
  }
};

function getNominaDefinition() {
  return {
    'Nomina': {
      strictArrayResponse: true,
      position: "nominas",
      version: '1.2',
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
        'Emisor': {
          position: "emisor",
          attributes: ["curp", "registroPatronal", "rfcPatronOrigen"],
          nodes: {
            'EntidadSNCF': {
              position: "entidades",
              strictArrayResponse: true,
              attributes: ["origenRecurso", "montoRecursoPropio"]
            }
          }
        },
        'Receptor': {
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
            'SubContratacion': {
              position: "subContrataciones",
              strictArrayResponse: true,
              attributes: ["rfcLabora", "porcentajeTiempo"]
            }
          }
        },
        'Percepciones': {
          position: "percepciones",
          attributes: [
            "totalGravado",
            "totalExento",
            "totalJubilacionPensionRetiro",
            "totalSeparacionIndemnizacion",
            "totalSueldos"
          ],
          nodes: {
            'Percepcion': {
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
                'HorasExtra': {
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
            'JubilacionPensionRetiro': {
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
            'SeparacionIndemnizacion': {
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
        'OtrosPagos': {
          nodes: {
            'OtroPago': {
              position: "otrosPagos",
              strictArrayResponse: true,
              attributes: ["tipoOtroPago", "clave", "concepto", "importe"],
              nodes: {
                'SubsidioAlEmpleo': {
                    attributes: ["subsidioCausado"],
                },
                'CompensacionSaldosAFavor': {
                    attributes: ["saldoAFavor", "remanenteSalFav"],
                }
              }
            }
          }
        },
        'Deducciones': {
          position: "deducciones",
          attributes: ["totalOtrasDeducciones", "totalImpuestosRetenidos"],
          nodes: {
            'Deduccion': {
              position: "arrayDeducciones",
              strictArrayResponse: true,
              attributes: ["tipoDeduccion", "clave", "concepto", "importe"]
            }
          }
        },
        'Incapacidades': {
          nodes: {
            'Incapacidad': {
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
  ...getNominaDefinition(),
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
