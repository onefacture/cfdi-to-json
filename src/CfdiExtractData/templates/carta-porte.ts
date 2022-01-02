import { tMinimalData } from '../index.d';

const nodeAutoTransporte = {
    position: 'autotransporte',
    attributes: [
        'permSCT', 'numPermisoSCT',
        // v1.0
        'nombreAseg', 'numPolizaSeguro'
    ],
    nodes: {
        'IdentificacionVehicular': {
            position: 'identificacionVehicular',
            attributes: [
                'configVehicular', 'placaVM', 'anioModeloVM'
            ]
        },
        'Seguros': {
            position: 'seguros',
            strictArrayResponse: true,
            attributes: [
                'aseguraRespCivil', 'polizaRespCivil', 'aseguraMedAmbiente',
                'polizaMedAmbiente', 'aseguraCarga', 'polizaCarga', 'primaSeguro'
            ]
        },
        'Remolques': {
            nodes: {
                'Remolque': {
                    position: 'remolques',
                    strictArrayResponse: true,
                    attributes: [
                        'subTipoRem', 'placa'
                    ],
                }
            }
        },
    }
};

const nodeDomicilio = {
    position: 'domicilio',
    attributes: [
        'calle', 'numeroExterior', 'numeroInterior', 'colonia',
        'localidad', 'referencia', 'municipio', 'estado', 'pais', 'codigoPostal'
    ]
};

export function getInnerNodes() {
    return {
        'Ubicaciones': {
            nodes: {
                'Ubicacion': {
                    position: 'ubicaciones',
                    strictArrayResponse: true,
                    attributes: [
                        'tipoUbicacion', 'idUbicacion', 'rfcRemitenteDestinatario',
                        'nombreRemitenteDestinatario', 'numRegIdTrib', 'residenciaFiscal',
                        'numEstacion', 'nombreEstacion', 'navegacionTrafico',
                        'fechaHoraSalidaLlegada','tipoEstacion', 'distanciaRecorrida'
                    ],
                    nodes: {
                        // Only v1.0
                        'Origen': {
                            position: 'origen',
                            attributes: [
                                'idOrigen', 'rfcRemitente', 'nombreRemitente', 'numRegIdTrib',
                                'residenciaFiscal', 'numEstacion', 'nombreEstacion',
                                'navegacionTrafico', 'fechaHoraSalida'
                            ]
                        },
                        // Only v1.0
                        'Destino': {
                            position: 'destino',
                            attributes: [
                                'idDestino', 'rfcDestinatario', 'nombreDestinatario', 'numRegIdTrib',
                                'residenciaFiscal', 'numEstacion', 'nombreEstacion',
                                'navegacionTrafico','fechaHoraProgLlegada'
                            ]
                        },
                        'Domicilio': nodeDomicilio
                    }
                }
            }
        },
        'Mercancias': {
            attributes: [
                'pesoBrutoTotal', 'unidadPeso', 'pesoNetoTotal', 'numTotalMercancias', 'cargoPorTasacion'
            ],
            nodes: {
                'Mercancia': {
                    position: 'mercancias',
                    strictArrayResponse: true,
                    attributes: [
                        'bienesTransp', 'claveSTCC', 'descripcion', 'cantidad', 'claveUnidad', 'unidad',
                        'dimensiones', 'materialPeligroso', 'cveMaterialPeligroso', 'embalaje', 'descripEmbalaje',
                        'pesoEnKg', 'valorMercancia', 'moneda', 'fraccionArancelaria', 'uuidComercioExt'
                    ],
                    nodes: {
                        'Pedimentos': {
                            position: 'pedimentos',
                            strictArrayResponse: true,
                            attributes: [ 'pedimento' ]
                        },
                        'GuiasIdentificacion': {
                            position: 'guiasIdentificacion',
                            strictArrayResponse: true,
                            attributes: [
                                'numeroGuiaIdentificacion', 'descripGuiaIdentificacion', 'pesoGuiaIdentificacion'
                            ]
                        },
                        // v1.0 y v2.0
                        'CantidadTransporta': {
                            position: 'cantidadTransporta',
                            strictArrayResponse: true,
                            attributes: [
                                'cantidad', 'idOrigen', 'idDestino', 'cvesTransporte'
                            ]
                        },
                        // v1.0 y v2.0
                        'DetalleMercancia': {
                            position: 'detalleMercancia',
                            strictArrayResponse: true,
                            attributes: [
                                'unidadPeso', 'unidadPesoMerc', 'pesoBruto', 'pesoNeto', 'pesoTara', 'numPiezas'
                            ]
                        },
                    }
                },
                // v1.0
                'AutotransporteFederal': nodeAutoTransporte,
                'Autotransporte': nodeAutoTransporte,
                'TransporteMaritimo': {
                    position: 'transporteMaritimo',
                    attributes: [
                        'permSCT', 'numPermisoSCT', 'nombreAseg', 'numPolizaSeguro', 'tipoEmbarcacion',
                        'matricula', 'numeroOMI', 'anioEmbarcacion', 'nombreEmbarc', 'nacionalidadEmbarc',
                        'unidadesDeArqBruto', 'tipoCarga', 'numCertITC', 'eslora', 'manga', 'calado',
                        'lineaNaviera', 'nombreAgenteNaviero', 'numAutorizacionNaviero', 'numViaje', 'numConocEmbarc'
                    ],
                    nodes: {
                        'Contenedor': {
                            position: 'contenedores',
                            strictArrayResponse: true,
                            attributes: [
                                'matriculaContenedor', 'tipoContenedor', 'numPrecinto'
                            ]
                        }
                    }
                },
                'TransporteAereo': {
                    position: 'transporteAereo',
                    strictArrayResponse: true,
                    attributes: [
                        'permSCT', 'numPermisoSCT', 'matriculaAeronave', 'nombreAseg', 'numPolizaSeguro',
                        'numeroGuia', 'lugarContrato', 'rfcTransportista', 'codigoTransportista', 'rfcEmbarcador',
                        'numRegIdTribEmbarc', 'residenciaFiscalEmbarc', 'nombreEmbarcador'
                    ]
                },
                'TransporteFerroviario': {
                    position: 'transporteFerroviario',
                    attributes: [
                        'tipoDeServicio', 'tipoDeTrafico', 'nombreAseg', 'numPolizaSeguro', 'concesionario'
                    ],
                    nodes: {
                        'DerechosDePaso': {
                            position: 'derechosDePaso',
                            attributes: ['tipoDerechoDePaso', 'kilometrajePagado']
                        },
                        'Carro': {
                            position: 'carro',
                            attributes: ['tipoCarro', 'matriculaCarro', 'guiaCarro', 'toneladasNetasCarro'],
                            nodes: {
                                'Contenedor': {
                                    position: 'contenedores',
                                    strictArrayResponse: true,
                                    attributes: [
                                        'tipoContenedor', 'pesoContenedorVacio', 'pesoNetoMercancia'
                                    ]
                                }
                            }
                        }
                    }
                },
            }
        },
        'FiguraTransporte': {
            attributes: ['cveTransporte'],
            nodes: {
                // Only v1.0
                'Operadores': {
                    nodes: {
                        'Operador': {
                            position: 'operadores',
                            strictArrayResponse: true,
                            attributes: [
                                'rfcOperador', 'numLicencia', 'nombreOperador',
                                'numRegIdTribOperador', 'residenciaFiscalOperador'
                            ],
                            'Domicilio': nodeDomicilio
                        }
                    }
                },
                // Only v1.0
                'Propietario': {
                    attributes: [
                        'rfcPropietario', 'nombrePropietario',
                        'numRegIdTribPropietario', 'residenciaFiscalPropietario'
                    ],
                    nodes: {
                        'Domicilio': nodeDomicilio
                    }
                },
                // Only v1.0
                'Arrendatario': {
                    attributes: [
                        'rfcArrendatario', 'nombreArrendatario',
                        'numRegIdTribArrendatario', 'residenciaFiscalArrendatario'
                    ],
                    nodes: {
                        'Domicilio': nodeDomicilio
                    }
                },
                // Only v1.0
                'Notificado': {
                    attributes: [
                        'rfcNotificado', 'nombreNotificado',
                        'numRegIdTribNotificado', 'residenciaFiscalNotificado'
                    ],
                    nodes: {
                        'Domicilio': nodeDomicilio
                    }
                },
                'TiposFigura': {
                    attributes: [
                        'tipoFigura', 'rfcFigura', 'numLicencia', 'nombreFigura',
                        'numRegIdTribFigura', 'residenciaFiscalFigura'
                    ],
                    nodes: {
                        'PartesTransporte': {
                            position: 'partesTransporte',
                            strictArrayResponse: true,
                            attributes: ['parteTransporte']
                        },
                        'Domicilio': nodeDomicilio
                    },
                },
            },
        },
    };
}

const minimalDataCartaPorte = {
  position: 'cartaPorte',
  attributes: ['version']
};

const allDataCartaPorte = {
    position: 'cartaPorte',
    attributes: [
        'version', 'transpInternac', 'entradaSalidaMerc',
        'paisOrigenDestino', 'viaEntradaSalida', 'totalDistRec',
    ],
    nodes: getInnerNodes(),
};

export const minimalDataDefinition = {
  'CartaPorte': minimalDataCartaPorte,
};

export const allDataDefinition = {
  'CartaPorte': allDataCartaPorte,
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
