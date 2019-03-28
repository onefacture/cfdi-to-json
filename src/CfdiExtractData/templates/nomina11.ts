export default ({ minimalData } = {}) => {
	if(minimalData) {
        return {
            'nomina:Nomina': {
                position: 'nomina',
                attributes: ['version']
            }
        }
    }

    return {
        'nomina:Nomina': {
            position: 'nomina',
            attributes: [
                'fechaInicialPago', 'fechaFinalPago','fechaPago','curp','version','periodicidadPago','tipoRegimen',
                'numSeguridadSocial', 'registroPatronal', 'puesto', 'departamento', 'salarioDiarioIntegrado', 'salarioBaseCotApor'
            ],
            nodes: {
                'nomina:Percepciones': {
                    position: 'percepciones',
                    attributes: ['totalGravado', 'totalExento'],
                    nodes: {
                        'nomina:Percepcion': {
                            attributes: ['tipoPercepcion', 'clave', 'concepto', 'importeGravado', 'importeExento'],
                            strictArrayResponse: true,
                            position: 'arrayPercepciones'
                        }
                    }
                },
                'nomina:Deducciones': {
                    position: 'deducciones',
                    attributes: ['totalGravado', 'totalExento'],
                    nodes: {
                        'nomina:Deduccion': {
                            attributes: ['tipoDeduccion', 'clave', 'concepto', 'importeGravado', 'importeExento'],
                            strictArrayResponse: true,
                            position: 'arrayDeducciones'
                        }
                    }
                }
            }
        }
    }
};
