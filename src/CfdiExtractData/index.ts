import * as fs      from 'fs';
import * as htmlEntity  from 'he';
import XMLExtract   from './../XmlExtractData';
import * as templatesDefinition from './templates';
export default class CfdiExtractData {

    public static extractGeneralData(params: {path?, contentXML?, minimalData?: Boolean}) {
        let contentXML = params.contentXML;
        if(params.path) {
            if(fs.existsSync(params.path)) {
                contentXML = fs.readFileSync(params.path, 'utf8');
            } else {
                return { error: 'FILE_NOT_FOUND' };
            }
        }

        let data: any   = {};
        let xmlExtract  = new XMLExtract(contentXML);
        let option :any = CfdiExtractData.getXMLVersion(xmlExtract);
        let extractMethod = null;

        switch (option.version) {
            case "3.2":
                extractMethod = CfdiExtractData.extractDataCFDI32.bind(CfdiExtractData);
                break;
            case "3.3":
                extractMethod = CfdiExtractData.extractDataCFDI33.bind(CfdiExtractData);
                break;
            default:
                // TODO: add exception
                throw "Invalid version";
        }

        if(extractMethod) {
            data = extractMethod({
                xmlExtract,
                namespace: 'cfdi',
                minimalData: params.minimalData
            });
            if(!data || !data.uuid || !data.emisor  || !data.receptor || !data.conceptos) {
                data = extractMethod({
                    xmlExtract,
                    minimalData: params.minimalData
                });
            }
        }

        if(data.emisor && data.emisor.rfc)     {
            data.emisor.rfc = htmlEntity.decode(data.emisor.rfc);
        }
    
        if(data.receptor && data.receptor.rfc) {
            data.receptor.rfc = htmlEntity.decode(data.receptor.rfc);
        }

        if(data.nomina && data.nomina.emisor && data.nomina.emisor.rfcPatronOrigen) {
            data.nomina.emisor.rfcPatronOrigen = htmlEntity.decode(data.nomina.emisor.rfcPatronOrigen);
        }

        return data;
    }

    public static getXMLVersion(xmlExtract: XMLExtract) {
        let option: any = xmlExtract.extractData({
            'cfdi:Comprobante': {
                attributes: [ 'version' ]
            }
        });

        return option;
    }

    public static extractDataCFDI32(params: { xmlExtract: XMLExtract, namespace?, minimalData }) {
        let data, complementsDefinition = this.getComplementsDefinition({ minimalData: params.minimalData });
        if(params.minimalData) {
            /* 
            *    Esta condicional es para obtener unicamente los datos necesarios
            *    para registrar en base de datos
            */
            data = params.xmlExtract.extractData({
                'cfdi:Comprobante': {
                    attributes: [
                        'fecha', 'formaDePago', 'metodoDePago', 'tipoDeComprobante'
                    ],
                    nodes: {
                        [`${params.namespace ? params.namespace + ':' : ''}Emisor`]: {
                            position: 'emisor',
                            attributes: ['rfc'],
                        },
                        [`${params.namespace ? params.namespace + ':' : ''}Receptor`]: {
                            position: 'receptor',
                            attributes: ['rfc'],
                        },
                        [`${params.namespace ? params.namespace + ':' : ''}Conceptos`]: {
                            nodes: {
                                [`${params.namespace ? params.namespace + ':' : ''}Concepto`]: {
                                    position: 'conceptos',
                                    strictArrayResponse: true,
                                    nodes: {
                                        [`${params.namespace ? params.namespace + ':' : ''}ComplementoConcepto`]: this.getConceptsComplementsDefinition(params),
                                    }
                                }
                            }
                        },
                        'Complemento': complementsDefinition,
                        'cfdi:Complemento': complementsDefinition
                    }
                }
            });
        } else {
            let arrayAddress = [
                'calle','noExterior','noInterior','colonia','municipio','localidad','estado','pais','codigoPostal'
            ];

            data = params.xmlExtract.extractData({
                'cfdi:Comprobante': {
                    attributes: [
                        'version', 'serie', 'sello', 'folio', 'fecha', 'formaDePago',
                        'metodoDePago', 'subTotal', 'total', 'certificado',
                        'noCertificado', 'tipoDeComprobante', 'moneda', 'tipoCambio',
                        'descuento', 'motivoDescuento', 'lugarExpedicion', 'numCtaPago'
                    ],
                    nodes: {
                        [`${params.namespace ? params.namespace + ':' : ''}Emisor`]: {
                            position: 'emisor',
                            attributes: ['nombre', 'rfc'],
                            nodes: {
                                [`${params.namespace ? params.namespace + ':' : ''}DomicilioFiscal`]: {
                                    position: 'domicilioFiscal',
                                    attributes: arrayAddress
                                },
                                [`${params.namespace ? params.namespace + ':' : ''}ExpedidoEn`]: {
                                    position: 'expedidoEn',
                                    attributes: arrayAddress
                                },
                                [`${params.namespace ? params.namespace + ':' : ''}RegimenFiscal`]: {
                                    attributes: ['regimen']
                                }
                            }
                        },
                        [`${params.namespace ? params.namespace + ':' : ''}Receptor`]: {
                            position: 'receptor',
                            attributes: ['nombre','rfc'],
                            nodes: {
                                [`${params.namespace ? params.namespace + ':' : ''}Domicilio`]: {
                                    position: 'domicilio',
                                    attributes: arrayAddress
                                }
                            }
                        },
                        [`${params.namespace ? params.namespace + ':' : ''}Conceptos`]: {
                            nodes: {
                                [`${params.namespace ? params.namespace + ':' : ''}Concepto`]: {
                                    position: 'conceptos',
                                    strictArrayResponse: true,
                                    attributes: ['cantidad','unidad', 'descripcion', 'valorUnitario', 'importe'],
                                    nodes: {
                                        [`${params.namespace ? params.namespace + ':' : ''}CuentaPredial`]: {
                                            position: 'cuentaPredial',
                                            attributes: ['numero']
                                        },
                                        [`${params.namespace ? params.namespace + ':' : ''}InformacionAduanera`]: {
                                            position: 'informacionAduanera',
                                            attributes: ['numero', 'fecha', 'aduana']
                                        },
                                        [`${params.namespace ? params.namespace + ':' : ''}ComplementoConcepto`]: this.getConceptsComplementsDefinition(params),
                                        [`${params.namespace ? params.namespace + ':' : ''}Parte`]: {
                                            position: 'partes',
                                            strictArrayResponse: true,
                                            attributes: [
                                                'cantidad', 'unidad', 'noIdentificacion', 'descripcion', 'valorUnitario', 'importe'
                                            ],
                                            nodes: {
                                                [`${params.namespace ? params.namespace + ':' : ''}InformacionAduanera`]: {
                                                    position: 'informacionAduanera',
                                                    attributes: ['numero', 'fecha', 'aduana']
                                                },
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        [`${params.namespace ? params.namespace + ':' : ''}Impuestos`]:   templatesDefinition.getImpuestosDefinition({namespace: params.namespace}),
                        'Complemento': complementsDefinition,
                        'cfdi:Complemento': complementsDefinition
                    }
                }
            });

            if(data.impuestos && data.impuestos.traslados) {
                data.impuestos.traslados = CfdiExtractData.getTaxesWithoutDuplicates(data.impuestos.traslados);
            }

            if(data.impuestos && data.impuestos.retenciones) {
                data.impuestos.retenciones = CfdiExtractData.getTaxesWithoutDuplicates(data.impuestos.retenciones);
            }
        }

        return data;
    }

    public static extractDataCFDI33(params: { xmlExtract: XMLExtract, namespace?, minimalData }) {
        let data, complementsDefinition = this.getComplementsDefinition({ minimalData: params.minimalData });
        if(params.minimalData) {
            /* 
            *    Esta condicional es para obtener unicamente los datos necesarios
            *    para registrar en base de datos
            */
            data = params.xmlExtract.extractData({
                'cfdi:Comprobante': {
                    attributes: [
                        'fecha', 'formaPago', 'metodoPago', 'tipoDeComprobante'
                    ],
                    nodes: {
                        [`${params.namespace ? params.namespace + ':' : ''}Emisor`]: {
                            position: 'emisor',
                            attributes: ['rfc'],
                        },
                        [`${params.namespace ? params.namespace + ':' : ''}Receptor`]: {
                            position: 'receptor',
                            attributes: ['rfc'],
                        },
                        [`${params.namespace ? params.namespace + ':' : ''}Conceptos`]: {
                            nodes: {
                                [`${params.namespace ? params.namespace + ':' : ''}Concepto`]: {
                                    position: 'conceptos',
                                    strictArrayResponse: true,
                                    nodes: {
                                        [`${params.namespace ? params.namespace + ':' : ''}ComplementoConcepto`]: this.getConceptsComplementsDefinition(params),
                                    }
                                }
                            }
                        },
                        'Complemento': complementsDefinition,
                        'cfdi:Complemento': complementsDefinition
                    }
                }
            });

        } else {
            data = params.xmlExtract.extractData({
                'cfdi:Comprobante': {
                    attributes: [
                       'version','serie','folio','fecha','sello','formaPago','noCertificado',
                       'certificado','condicionesDePago','subTotal','descuento','moneda',
                       'tipoCambio','total','tipoDeComprobante','metodoPago','lugarExpedicion','confirmacion'
                    ], nodes: {
                        [`${params.namespace ? params.namespace + ':' : ''}CfdiRelacionados`]: {
                            position:   'relacionados',
                            attributes: ['tipoRelacion'],
                            nodes: {
                                [`${params.namespace ? params.namespace + ':' : ''}CfdiRelacionado`]: {
                                    position: 'uuids',
                                    strictArrayResponse: true,
                                    attributes: ['uuid']
                                }
                            }
                        },
                        [`${params.namespace ? params.namespace + ':' : ''}Emisor`]: {
                            position: 'emisor',
                            attributes: ['nombre', 'rfc', 'regimenFiscal']
                        },
                        [`${params.namespace ? params.namespace + ':' : ''}Receptor`]: {
                            position: 'receptor',
                            attributes: ['nombre', 'rfc', 'residenciaFiscal', 'numRegIdTrib', 'usoCFDI']
                        },
                        [`${params.namespace ? params.namespace + ':' : ''}Conceptos`]: {
                            nodes: {
                                [`${params.namespace ? params.namespace + ':' : ''}Concepto`]: {
                                    position: 'conceptos',
                                    strictArrayResponse: true,
                                    attributes: [
                                        'claveProdServ','noIdentificacion','cantidad','claveUnidad',
                                        'unidad','descripcion','valorUnitario','importe','descuento'
                                    ],
                                    nodes: {
                                        [`${params.namespace ? params.namespace + ':' : ''}CuentaPredial`]: {
                                            position: 'cuentaPredial',
                                            attributes: ['numero']
                                        },
                                        [`${params.namespace ? params.namespace + ':' : ''}InformacionAduanera`]: {
                                            position: 'informacionAduanera',
                                            attributes: ['numero', 'fecha', 'aduana']
                                        },
                                        [`${params.namespace ? params.namespace + ':' : ''}ComplementoConcepto`]: this.getConceptsComplementsDefinition(params),
                                        [`${params.namespace ? params.namespace + ':' : ''}Parte`]: {
                                            position: 'partes',
                                            strictArrayResponse: true,
                                            attributes: [
                                                'cantidad', 'unidad', 'noIdentificacion', 'descripcion', 'valorUnitario', 'importe'
                                            ],
                                            nodes: {
                                                [`${params.namespace ? params.namespace + ':' : ''}InformacionAduanera`]: {
                                                    position: 'informacionAduanera',
                                                    attributes: ['numero', 'fecha', 'aduana']
                                                },
                                            }
                                        },
                                        [`${params.namespace ? params.namespace + ':' : ''}Impuestos`]: {
                                            position: 'impuestos',
                                            nodes: {
                                                [`${params.namespace ? params.namespace + ':' : ''}Traslados`]: {
                                                    nodes: {
                                                        [`${params.namespace ? params.namespace + ':' : ''}Traslado`]: {
                                                            position: 'traslados',
                                                            strictArrayResponse: true,
                                                            attributes: ['base', 'impuesto', 'tipoFactor', 'tasaOCuota', 'importe']
                                                        }
                                                    }
                                                },
                                                [`${params.namespace ? params.namespace + ':' : ''}Retenciones`]: {
                                                    nodes: {
                                                        [`${params.namespace ? params.namespace + ':' : ''}Retencion`]: {
                                                            position: 'retenciones',
                                                            strictArrayResponse: true,
                                                            attributes: ['base', 'impuesto', 'tipoFactor', 'tasaOCuota', 'importe']
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        [`${params.namespace ? params.namespace + ':' : ''}Impuestos`]:   templatesDefinition.getImpuestosDefinition({namespace: params.namespace}),
                        'Complemento': complementsDefinition,
                        'cfdi:Complemento': complementsDefinition
                    }
                }
            });
        }

        return data;
    }

    public static getTaxesWithoutDuplicates(taxes) {
        let localTaxes = {}, tax, result = [], taxesCopy = taxes.map((tax) => { return (<any> Object).assign({}, tax); });
        for(tax of taxesCopy) {
            tax.importe = parseFloat(tax.importe);
            tax.impuesto = tax.impuesto.toUpperCase();
            if(localTaxes[tax.impuesto]) {
                localTaxes[tax.impuesto].importe += tax.importe;
            } else {
                localTaxes[tax.impuesto] = tax;
            }
        }

        for(let i in localTaxes) {
            if(localTaxes.hasOwnProperty(i)) {
                result.push(localTaxes[i]);
            }
        }

        return result;
    }

    public static getSumTaxes(taxes) {
        let result = 0, tax;
        for(tax of taxes) {
            result += parseFloat(tax.importe);
        }

        return result;
    }

    public static getConceptsComplementsDefinition(params: {minimalData}) {
        return {
            nodes: {
                // Instituciones educativas privadas
                ...templatesDefinition.getInstitucionesEducativasPrivadasDefinition(params),
                // Venta vehiculos v1.0 and v1.1
                ...templatesDefinition.getVentaVehiculosDefinition(params),
                // Terceros v1.1
                ...templatesDefinition.getTercerosDefinition(params),
                // Acreditamiento IEPS v1.1
                ...templatesDefinition.getAcreditamientoIepsDefinition(params),
            }
        };
    }

    public static getComplementsDefinition(params: { minimalData }) {
        return {
            nodes: {
                // Timbre fiscal definition
                ...templatesDefinition.getTimbreDefinition(params),
                // Pagos definition
                ...templatesDefinition.getPagosDefinition(params),
                // Impuestos locales
                ...templatesDefinition.getImpLocalDefinition(params),
                // Nomina v1.1 and v1.2
                ...templatesDefinition.getNomina11Definition(params),
                ...templatesDefinition.getNomina12Definition(params),
                // EstadoDeCuentaCombustible v1.0, v1.1 and v1.2
                ...templatesDefinition.getEstadoCuentaCombustible10Definition(params),
                ...templatesDefinition.getEstadoCuentaCombustible11Definition(params),
                ...templatesDefinition.getEstadoCuentaCombustible12Definition(params),
                // Donatarias v1.0 and v1.1
                ...templatesDefinition.getDonatariasDefinition(params),
                // Divisas v1.0
                ...templatesDefinition.getDivisasDefinition(params),
                // Leyendas fiscales v1.1
                ...templatesDefinition.getLeyendasFiscalesDefinition(params),
                // Personas fisicas integrantes de coordinados v1.0
                ...templatesDefinition.getPFintegranteCoordinadoDefinition(params),
                // Turista pasajero extranjero v1.0
                ...templatesDefinition.getTuristaPasajeroExtranjeroDefinition(params),
                // SPEI v?
                ...templatesDefinition.getSpeiDefinition(params),
                // Detallista v?
                // TODO: Add all nodes
                ...templatesDefinition.getDetallistaDefinition(params),
                // CFDI Registro Fiscal Definition v1.0
                ...templatesDefinition.getCfdiRegistroFiscalDefinition(params),
                // Pago en especie v1.0
                ...templatesDefinition.getPagoEnEspecieDefinition(params),
                // Vales de despensa v1.0
                ...templatesDefinition.getValesDespensaDefinition(params),
                // Consumo de combustibles v1.0 and v1.1
                ...templatesDefinition.getConsumoDeCombustibles10Definition(params),
                ...templatesDefinition.getConsumoDeCombustibles11Definition(params),
                // Aerolineas v1.0
                ...templatesDefinition.getAerolineasDefinition(params),
                // Notarios v1.0
                ...templatesDefinition.getNotariosDefinition(params),
                // Auto usado v1.0
                ...templatesDefinition.getVehiculoUsadoDefinition(params),
                // Servicio parcial de construcción v1.0
                ...templatesDefinition.getServicioParcialConstruccionDefinition(params),
                // Renovación y sustitución de vehiculos v?
                // TODO: Add all nodes
                ...templatesDefinition.getRenovacionSustitucionVehiculosDefinition(params),
                // Certificado de destrucción v1.0
                // TODO: Add all nodes
                ...templatesDefinition.getCertificadoDestruccionDefinition(params),
                // Obras de arte plásticas y antigüedades v1.0
                ...templatesDefinition.getObrasArteAntiguedadesDefinition(params),
                // Comercio exterior v1.0 and v1.1
                // TODO: Add all nodes
                ...templatesDefinition.getComercioExterior10Definition(params),
                ...templatesDefinition.getComercioExterior11Definition(params),
                // INE v1.0 and 1.1
                // TODO: Add all nodes
                ...templatesDefinition.getIneDefinition(params),
            }
        };
    }

}
