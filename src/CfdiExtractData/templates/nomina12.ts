import {
    tMinimalData
} from '../index.d';
export default (params: tMinimalData) => {
	if(params.minimalData) {
        return {
            'nomina12:Nomina': {
                position: 'nomina',
                attributes: ['version']
            }
        }
    }

    return {
        'nomina12:Nomina': {
            position: 'nomina',
            attributes: [
                'version', 'tipoNomina', 'fechaPago', 'fechaInicialPago', 'fechaFinalPago',
                'numDiasPagados', 'totalPercepciones', 'totalDeducciones', 'totalOtrosPagos'
            ],
            nodes: {
                'nomina12:Emisor': {
                    position: 'emisor',
                    attributes: ['curp', 'registroPatronal', 'rfcPatronOrigen'],
                    nodes: {
                        'nomina12:EntidadSNCF': {
                            position: 'entidades',
                            strictArrayResponse: true,
                            attributes: ['origenRecurso', 'montoRecursoPropio'],
                        }
                    }
                },
                'nomina12:Receptor': {
                    position: 'receptor',
                    attributes: [
                        'curp', 'tipoContrato', 'tipoRegimen', 'numEmpleado', 'periodicidadPago',
                        'claveEntFed', 'numSeguridadSocial', 'fechaInicioRelLaboral', 'antigüedad',
                        'sindicalizado', 'tipoJornada', 'departamento', 'puesto', 'riesgoPuesto',
                        'banco', 'cuentaBancaria', 'salarioBaseCotApor', 'salarioDiarioIntegrado'
                    ],
                    nodes: {
                        'nomina12:SubContratacion': {
                            position: 'subContrataciones',
                            strictArrayResponse: true,
                            attributes: ['rfcLabora', 'porcentajeTiempo'],
                        }
                    }
                },
                'nomina12:Percepciones': {
                    position: 'percepciones',
                    attributes: [
                        'totalGravado', 'totalExento', 'totalJubilacionPensionRetiro',
                        'totalSeparacionIndemnizacion', 'totalSueldos'
                    ],
                    nodes: {
                        'nomina12:Percepcion': {
                            position: 'arrayPercepciones',
                            strictArrayResponse: true,
                            attributes: [
                                'tipoPercepcion', 'clave', 'concepto', 'importeGravado', 'importeExento'
                            ],
                            nodes: {
                                'nomina12:HorasExtra': {
                                    position: 'horasExtra',
                                    strictArrayResponse: true,
                                    attributes: ['dias', 'tipoHoras', 'horasExtra', 'importePagado']
                                }
                            }
                        },
                        'nomina12:JubilacionPensionRetiro': {
                            position: 'arrayJubilacionPensionRetiro',
                            strictArrayResponse: true,
                            attributes: [
                                'totalUnaExhibicion', 'totalParcialidad', 'montoDiario',
                                'ingresoAcumulable', 'ingresoNoAcumulable'
                            ]
                        },
                        'nomina12:SeparacionIndemnizacion': {
                            position: 'arraySeparacionIndemnizacion',
                            strictArrayResponse: true,
                            attributes: [
                                'totalPagado', 'numAñosServicio', 'ultimoSueldoMensOrd',
                                'ingresoAcumulable', 'IngresoNoAcumulable'
                            ]
                        }
                    }
                },
                'nomina12:OtrosPagos': {
                    nodes: {
                        'nomina12:OtroPago': {
                            position: 'otrosPagos',
                            strictArrayResponse: true,
                            attributes:['tipoOtroPago', 'clave', 'concepto', 'importe']
                        }
                    }
                },
                'nomina12:Deducciones': {
                    position: 'deducciones',
                    attributes: ['totalOtrasDeducciones', 'totalImpuestosRetenidos'],
                    nodes: {
                        'nomina12:Deduccion': {
                            position: 'arrayDeducciones',
                            strictArrayResponse: true,
                            attributes: ['tipoDeduccion', 'clave', 'concepto', 'importe']
                        }
                    }
                },
                'nomina12:Incapacidades': {
                    nodes: {
                        'nomina12:Incapacidad': {
                            position: 'incapacidades',
                            strictArrayResponse: true,
                            attributes: ['diasIncapacidad', 'tipoIncapacidad', 'importeMonetario']
                        }
                    }
                }
            }
        }
    }
};
