import nomina12Template from "../nomina12";
describe("Nomina 12 data test", () => {
  it("Execute without params", () => {
    expect(nomina12Template()).toEqual({
      "nomina12:Nomina": {
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
          "nomina12:Emisor": {
            position: "emisor",
            attributes: ["curp", "registroPatronal", "rfcPatronOrigen"],
            nodes: {
              "nomina12:EntidadSNCF": {
                position: "entidades",
                strictArrayResponse: true,
                attributes: ["origenRecurso", "montoRecursoPropio"]
              }
            }
          },
          "nomina12:Receptor": {
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
              "nomina12:SubContratacion": {
                position: "subContrataciones",
                strictArrayResponse: true,
                attributes: ["rfcLabora", "porcentajeTiempo"]
              }
            }
          },
          "nomina12:Percepciones": {
            position: "percepciones",
            attributes: [
              "totalGravado",
              "totalExento",
              "totalJubilacionPensionRetiro",
              "totalSeparacionIndemnizacion",
              "totalSueldos"
            ],
            nodes: {
              "nomina12:Percepcion": {
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
                  "nomina12:HorasExtra": {
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
              "nomina12:JubilacionPensionRetiro": {
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
              "nomina12:SeparacionIndemnizacion": {
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
          "nomina12:OtrosPagos": {
            nodes: {
              "nomina12:OtroPago": {
                position: "otrosPagos",
                strictArrayResponse: true,
                attributes: ["tipoOtroPago", "clave", "concepto", "importe"],
                nodes: {
                  "nomina12:SubsidioAlEmpleo": {
                      attributes: ["subsidioCausado"],
                  },
                  "nomina12:CompensacionSaldosAFavor": {
                      attributes: ["saldoAFavor", "remanenteSalFav"],
                  }
                }
              }
            }
          },
          "nomina12:Deducciones": {
            position: "deducciones",
            attributes: ["totalOtrasDeducciones", "totalImpuestosRetenidos"],
            nodes: {
              "nomina12:Deduccion": {
                position: "arrayDeducciones",
                strictArrayResponse: true,
                attributes: ["tipoDeduccion", "clave", "concepto", "importe"]
              }
            }
          },
          "nomina12:Incapacidades": {
            nodes: {
              "nomina12:Incapacidad": {
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
      },
      "Nomina": {
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
          "Emisor": {
            position: "emisor",
            attributes: ["curp", "registroPatronal", "rfcPatronOrigen"],
            nodes: {
              "EntidadSNCF": {
                position: "entidades",
                strictArrayResponse: true,
                attributes: ["origenRecurso", "montoRecursoPropio"]
              }
            }
          },
          "Receptor": {
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
              "SubContratacion": {
                position: "subContrataciones",
                strictArrayResponse: true,
                attributes: ["rfcLabora", "porcentajeTiempo"]
              }
            }
          },
          "Percepciones": {
            position: "percepciones",
            attributes: [
              "totalGravado",
              "totalExento",
              "totalJubilacionPensionRetiro",
              "totalSeparacionIndemnizacion",
              "totalSueldos"
            ],
            nodes: {
              "Percepcion": {
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
                  "HorasExtra": {
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
              "JubilacionPensionRetiro": {
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
              "SeparacionIndemnizacion": {
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
          "OtrosPagos": {
            nodes: {
              "OtroPago": {
                position: "otrosPagos",
                strictArrayResponse: true,
                attributes: ["tipoOtroPago", "clave", "concepto", "importe"],
                nodes: {
                  "SubsidioAlEmpleo": {
                      attributes: ["subsidioCausado"],
                  },
                  "CompensacionSaldosAFavor": {
                      attributes: ["saldoAFavor", "remanenteSalFav"],
                  }
                }
              }
            }
          },
          "Deducciones": {
            position: "deducciones",
            attributes: ["totalOtrasDeducciones", "totalImpuestosRetenidos"],
            nodes: {
              "Deduccion": {
                position: "arrayDeducciones",
                strictArrayResponse: true,
                attributes: ["tipoDeduccion", "clave", "concepto", "importe"]
              }
            }
          },
          "Incapacidades": {
            nodes: {
              "Incapacidad": {
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
    });
  });
  it("Execute with minimalData: False", () => {
    expect(nomina12Template({ minimalData: false })).toEqual({
      "nomina12:Nomina": {
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
          "nomina12:Emisor": {
            position: "emisor",
            attributes: ["curp", "registroPatronal", "rfcPatronOrigen"],
            nodes: {
              "nomina12:EntidadSNCF": {
                position: "entidades",
                strictArrayResponse: true,
                attributes: ["origenRecurso", "montoRecursoPropio"]
              }
            }
          },
          "nomina12:Receptor": {
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
              "nomina12:SubContratacion": {
                position: "subContrataciones",
                strictArrayResponse: true,
                attributes: ["rfcLabora", "porcentajeTiempo"]
              }
            }
          },
          "nomina12:Percepciones": {
            position: "percepciones",
            attributes: [
              "totalGravado",
              "totalExento",
              "totalJubilacionPensionRetiro",
              "totalSeparacionIndemnizacion",
              "totalSueldos"
            ],
            nodes: {
              "nomina12:Percepcion": {
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
                  "nomina12:HorasExtra": {
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
              "nomina12:JubilacionPensionRetiro": {
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
              "nomina12:SeparacionIndemnizacion": {
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
          "nomina12:OtrosPagos": {
            nodes: {
              "nomina12:OtroPago": {
                position: "otrosPagos",
                strictArrayResponse: true,
                attributes: ["tipoOtroPago", "clave", "concepto", "importe"],
                nodes: {
                  "nomina12:SubsidioAlEmpleo": {
                      attributes: ["subsidioCausado"],
                  },
                  "nomina12:CompensacionSaldosAFavor": {
                      attributes: ["saldoAFavor", "remanenteSalFav"],
                  }
                }
              }
            }
          },
          "nomina12:Deducciones": {
            position: "deducciones",
            attributes: ["totalOtrasDeducciones", "totalImpuestosRetenidos"],
            nodes: {
              "nomina12:Deduccion": {
                position: "arrayDeducciones",
                strictArrayResponse: true,
                attributes: ["tipoDeduccion", "clave", "concepto", "importe"]
              }
            }
          },
          "nomina12:Incapacidades": {
            nodes: {
              "nomina12:Incapacidad": {
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
      },
      "Nomina": {
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
          "Emisor": {
            position: "emisor",
            attributes: ["curp", "registroPatronal", "rfcPatronOrigen"],
            nodes: {
              "EntidadSNCF": {
                position: "entidades",
                strictArrayResponse: true,
                attributes: ["origenRecurso", "montoRecursoPropio"]
              }
            }
          },
          "Receptor": {
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
              "SubContratacion": {
                position: "subContrataciones",
                strictArrayResponse: true,
                attributes: ["rfcLabora", "porcentajeTiempo"]
              }
            }
          },
          "Percepciones": {
            position: "percepciones",
            attributes: [
              "totalGravado",
              "totalExento",
              "totalJubilacionPensionRetiro",
              "totalSeparacionIndemnizacion",
              "totalSueldos"
            ],
            nodes: {
              "Percepcion": {
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
                  "HorasExtra": {
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
              "JubilacionPensionRetiro": {
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
              "SeparacionIndemnizacion": {
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
          "OtrosPagos": {
            nodes: {
              "OtroPago": {
                position: "otrosPagos",
                strictArrayResponse: true,
                attributes: ["tipoOtroPago", "clave", "concepto", "importe"],
                nodes: {
                  "SubsidioAlEmpleo": {
                      attributes: ["subsidioCausado"],
                  },
                  "CompensacionSaldosAFavor": {
                      attributes: ["saldoAFavor", "remanenteSalFav"],
                  }
                }
              }
            }
          },
          "Deducciones": {
            position: "deducciones",
            attributes: ["totalOtrasDeducciones", "totalImpuestosRetenidos"],
            nodes: {
              "Deduccion": {
                position: "arrayDeducciones",
                strictArrayResponse: true,
                attributes: ["tipoDeduccion", "clave", "concepto", "importe"]
              }
            }
          },
          "Incapacidades": {
            nodes: {
              "Incapacidad": {
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
    });
  });
  it("Execute with minimalData: True", () => {
    expect(nomina12Template({ minimalData: true })).toEqual({
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
    });
  });
});
