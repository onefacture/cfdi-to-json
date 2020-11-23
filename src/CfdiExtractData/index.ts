import * as fs      from 'fs';
import * as htmlEntity  from 'he';
import XMLExtract   from './../XmlExtractData';
import * as templatesDefinition from './templates';
import {
    tImpuesto, tMinimalData
} from '@OwnTypes';
export default class CfdiExtractData {

    public static extractGeneralData(params: {path?: any, contentXML?: any, minimalData?: Boolean}) {
        let contentXML = params.contentXML;
        if(params.path) {
            if(fs.existsSync(params.path)) {
                contentXML = fs.readFileSync(params.path, 'utf8');
            } else {
                return { error: 'FILE_NOT_FOUND' };
            }
        }

        let isRetencion   = contentXML.indexOf('retenciones:Retenciones') >= 0;
        let data: any     = {};
        let xmlExtract    = new XMLExtract(contentXML);
        let option :any   = CfdiExtractData.getXMLVersion(xmlExtract, { isRetencion });
        let extractMethod = null;

        switch (option.version) {
            case "1.0":
                extractMethod = CfdiExtractData.extractDataRetencion10.bind(CfdiExtractData);
                break;
            case "3.2":
                extractMethod = CfdiExtractData.extractDataCFDI32.bind(CfdiExtractData);
                break;
            case "3.3":
                extractMethod = CfdiExtractData.extractDataCFDI33.bind(CfdiExtractData);
                break;
            default:
                // TODO: add exception
                throw `${option.version} Invalid version`;
        }

        if(extractMethod) {
            data = extractMethod({
                xmlExtract,
                namespace: !isRetencion ? 'cfdi' : 'retenciones',
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

        if(data.nominas && data.nominas.length) {
            data.nominas = data.nominas.map((nomina: any) => Object.assign({}, nomina, {
                emisor: Object.assign({ }, nomina.emisor || { }, {
                    rfcPatronOrigen: htmlEntity.decode(nomina.emisor ? (nomina.emisor.rfcPatronOrigen || '') : '')
                })
            }));
        }

        if(isRetencion) {
            data = {
                isRetencion,
                ...data,
            }
        }

        return data;
    }

    public static getUuidByXML(params: {path?: any, contentXML?: any}) {
        let contentXML = params.contentXML;
        if(params.path) {
            if(fs.existsSync(params.path)) {
                contentXML = fs.readFileSync(params.path, 'utf8');
            } else {
                return { error: 'FILE_NOT_FOUND' };
            }
        }

        const xmlExtract  = new XMLExtract(contentXML);
        const timbreDefinition = templatesDefinition.getTimbreDefinition({ minimalData: true })

        const data: any = xmlExtract.extractData({
            /*
            * Algunos XMLs en especial los viejitos tenian estructuras distintas al estandar
            ***/
            'cfdi:Comprobante': {
                nodes: {
                    'Complemento': {
                        nodes: timbreDefinition
                    },
                    'cfdi:Complemento': {
                        nodes: timbreDefinition
                    }
                }
            },
            'Comprobante': {
                nodes: {
                    'Complemento': {
                        nodes: timbreDefinition
                    },
                    'cfdi:Complemento': {
                        nodes: timbreDefinition
                    }
                }
            }
        });
        
        return data.uuid;
    }

    public static getXMLVersion(xmlExtract: XMLExtract, params?: { isRetencion: any }) {
        if(params && params.isRetencion) {
            return xmlExtract.extractData({
                'retenciones:Retenciones': {
                    attributes: [ 'version' ]
                }
            });
        }

        return xmlExtract.extractData({
            'cfdi:Comprobante': {
                attributes: [ 'version' ]
            }
        });
    }

    public static extractDataCFDI32(params: { xmlExtract: XMLExtract, namespace?: any, minimalData: Boolean }) {
        let data, complementsDefinition = this.getComplementsDefinition({ minimalData: params.minimalData });
        if(params.minimalData) {
            /* 
            *    Esta condicional es para obtener unicamente los datos necesarios
            *    para registrar en base de datos
            */
            return params.xmlExtract.extractData({
                'cfdi:Comprobante': {
                    attributes: [
                        'version', 'fecha', 'formaDePago', 'metodoDePago', 'tipoDeComprobante'
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
                                        [`${params.namespace ? params.namespace + ':' : ''}ComplementoConcepto`]: this.getConceptsComplementsDefinition({ minimalData: params.minimalData }),
                                    }
                                }
                            }
                        },
                        'Complemento': complementsDefinition,
                        'cfdi:Complemento': complementsDefinition
                    }
                }
            });
        }

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
                                    [`${params.namespace ? params.namespace + ':' : ''}ComplementoConcepto`]: this.getConceptsComplementsDefinition({ minimalData: params.minimalData }),
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

        return data;
    }

    public static extractDataCFDI33(params: { xmlExtract: XMLExtract, namespace?: any, minimalData: Boolean }) {
        let data, complementsDefinition = this.getComplementsDefinition({ minimalData: params.minimalData });
        if(params.minimalData) {
            /* 
            *    Esta condicional es para obtener unicamente los datos necesarios
            *    para registrar en base de datos
            */
            return params.xmlExtract.extractData({
                'cfdi:Comprobante': {
                    attributes: [
                        'version', 'fecha', 'formaPago', 'metodoPago', 'tipoDeComprobante'
                    ],
                    nodes: {
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
                            attributes: ['rfc'],
                        },
                        [`${params.namespace ? params.namespace + ':' : ''}Receptor`]: {
                            position: 'receptor',
                            attributes: ['rfc', 'usoCFDI'],
                        },
                        [`${params.namespace ? params.namespace + ':' : ''}Conceptos`]: {
                            nodes: {
                                [`${params.namespace ? params.namespace + ':' : ''}Concepto`]: {
                                    position: 'conceptos',
                                    strictArrayResponse: true,
                                    nodes: {
                                        [`${params.namespace ? params.namespace + ':' : ''}ComplementoConcepto`]: this.getConceptsComplementsDefinition({ minimalData: params.minimalData }),
                                    }
                                }
                            }
                        },
                        'Complemento': complementsDefinition,
                        'cfdi:Complemento': complementsDefinition
                    }
                }
            });
        }

        return params.xmlExtract.extractData({
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
                                    [`${params.namespace ? params.namespace + ':' : ''}ComplementoConcepto`]: this.getConceptsComplementsDefinition({ minimalData: params.minimalData }),
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

    public static extractDataRetencion10(params: { xmlExtract: XMLExtract, namespace?: any, minimalData: Boolean }) {
        let data, complementsDefinition = this.getComplementsRetencionDefinition({ minimalData: params.minimalData });
        if(params.minimalData) {
            return params.xmlExtract.extractData({
                'retenciones:Retenciones': {
                    attributes: [ 'version' ],
                    nodes: {
                        [`${params.namespace ? params.namespace + ':' : ''}Emisor`]: {
                            position: 'emisor',
                            attributes: ['rfcEmisor', 'nomDenRazSocE'],
                        },
                        [`${params.namespace ? params.namespace + ':' : ''}Receptor`]: {
                            position: 'receptor',
                            attributes: ['nacionalidad'],
                            nodes: {
                                [`${params.namespace ? params.namespace + ':' : ''}Nacional`]: {
                                    attributes: ['rfcRecep'],
                                },
                                [`${params.namespace ? params.namespace + ':' : ''}Extranjero`]: {
                                    attributes: ['numRegIdTrib'],
                                }
                            }
                        },
                        'Complemento': complementsDefinition,
                        // 'cfdi:Complemento': complementsDefinition
                    }
                }
            });
        }

        return params.xmlExtract.extractData({
            'retenciones:Retenciones': {
                attributes: [
                    'version', 'folioInt', 'sello', 'numCert', 'cert', 'fechaExp', 'cveRetenc', 'descRetenc',
                ],
                nodes: {
                    [`${params.namespace ? params.namespace + ':' : ''}Emisor`]: {
                        position: 'emisor',
                        attributes: ['rfcEmisor', 'nomDenRazSocE', 'curpe'],
                    },
                    [`${params.namespace ? params.namespace + ':' : ''}Receptor`]: {
                        position: 'receptor',
                        attributes: ['nacionalidad'],
                        nodes: {
                            [`${params.namespace ? params.namespace + ':' : ''}Nacional`]: {
                                attributes: [ 'rfcRecep', 'nomDenRazSocR', 'curpr' ],
                            },
                            [`${params.namespace ? params.namespace + ':' : ''}Extranjero`]: {
                                attributes: ['numRegIdTrib', 'nomDenRazSocR'],
                            }
                        }
                    },
                    [`${params.namespace ? params.namespace + ':' : ''}Periodo`]: {
                        position: 'periodo',
                        attributes: ['mesIni', 'mesFin', 'ejerc'],
                    },
                    [`${params.namespace ? params.namespace + ':' : ''}Totales`]: {
                        position: 'totales',
                        attributes: ['montoTotOperacion', 'montoTotGrav', 'montoTotExent', 'montoTotRet'],
                        nodes: {
                            [`${params.namespace ? params.namespace + ':' : ''}ImpRetenidos`]: {
                                strictArrayResponse: true,
                                position: 'impuestosRetenidos',
                                attributes: [ 'baseRet', 'impuesto', 'montoRet', 'tipoPagoRet' ],
                            },
                        }
                    },
                    'Complemento': complementsDefinition,
                    // 'cfdi:Complemento': complementsDefinition
                }
            }
        });
    }

    public static getTaxesWithoutDuplicates(taxes: Array<tImpuesto>) {
        let localTaxes: any = {}, tax: tImpuesto, result = [], taxesCopy = taxes.map((tax: tImpuesto) => { return (<any> Object).assign({}, tax); });
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

    public static getSumTaxes(taxes: any) {
        let result = 0, tax;
        for(tax of taxes) {
            result += parseFloat(tax.importe);
        }

        return result;
    }

    public static getConceptsComplementsDefinition(params: tMinimalData) {
        return {
            nodes: {
                // Instituciones educativas privadas
                ...templatesDefinition.getInstitucionesEducativasPrivadasDefinition({ minimalData: params.minimalData }),
                // Venta vehiculos v1.0 and v1.1
                ...templatesDefinition.getVentaVehiculosDefinition({ minimalData: params.minimalData }),
                // Terceros v1.1
                ...templatesDefinition.getTercerosDefinition({ minimalData: params.minimalData }),
                // Acreditamiento IEPS v1.1
                ...templatesDefinition.getAcreditamientoIepsDefinition({ minimalData: params.minimalData }),
            }
        };
    }

    public static getComplementsDefinition(params: tMinimalData) {
        return {
            nodes: {
                // Timbre fiscal definition
                ...templatesDefinition.getTimbreDefinition({ minimalData: params.minimalData }),
                // Pagos definition
                ...templatesDefinition.getPagosDefinition({ minimalData: params.minimalData }),
                // Impuestos locales
                ...templatesDefinition.getImpLocalDefinition({ minimalData: params.minimalData }),
                // Nomina v1.1 and v1.2
                ...templatesDefinition.getNomina11Definition({ minimalData: params.minimalData }),
                ...templatesDefinition.getNomina12Definition({ minimalData: params.minimalData }),
                // EstadoDeCuentaCombustible v1.0, v1.1 and v1.2
                ...templatesDefinition.getEstadoCuentaCombustible10Definition({ minimalData: params.minimalData }),
                ...templatesDefinition.getEstadoCuentaCombustible11Definition({ minimalData: params.minimalData }),
                ...templatesDefinition.getEstadoCuentaCombustible12Definition({ minimalData: params.minimalData }),
                // Donatarias v1.0 and v1.1
                ...templatesDefinition.getDonatariasDefinition({ minimalData: params.minimalData }),
                // Divisas v1.0
                ...templatesDefinition.getDivisasDefinition({ minimalData: params.minimalData }),
                // Leyendas fiscales v1.1
                ...templatesDefinition.getLeyendasFiscalesDefinition({ minimalData: params.minimalData }),
                // Personas fisicas integrantes de coordinados v1.0
                ...templatesDefinition.getPFintegranteCoordinadoDefinition({ minimalData: params.minimalData }),
                // Turista pasajero extranjero v1.0
                ...templatesDefinition.getTuristaPasajeroExtranjeroDefinition({ minimalData: params.minimalData }),
                // SPEI v?
                ...templatesDefinition.getSpeiDefinition({ minimalData: params.minimalData }),
                // Detallista v?
                // TODO: Add all nodes
                ...templatesDefinition.getDetallistaDefinition({ minimalData: params.minimalData }),
                // CFDI Registro Fiscal Definition v1.0
                ...templatesDefinition.getCfdiRegistroFiscalDefinition({ minimalData: params.minimalData }),
                // Pago en especie v1.0
                ...templatesDefinition.getPagoEnEspecieDefinition({ minimalData: params.minimalData }),
                // Vales de despensa v1.0
                ...templatesDefinition.getValesDespensaDefinition({ minimalData: params.minimalData }),
                // Consumo de combustibles v1.0 and v1.1
                ...templatesDefinition.getConsumoDeCombustibles10Definition({ minimalData: params.minimalData }),
                ...templatesDefinition.getConsumoDeCombustibles11Definition({ minimalData: params.minimalData }),
                // Aerolineas v1.0
                ...templatesDefinition.getAerolineasDefinition({ minimalData: params.minimalData }),
                // Notarios v1.0
                ...templatesDefinition.getNotariosDefinition({ minimalData: params.minimalData }),
                // Auto usado v1.0
                ...templatesDefinition.getVehiculoUsadoDefinition({ minimalData: params.minimalData }),
                // Servicio parcial de construcción v1.0
                ...templatesDefinition.getServicioParcialConstruccionDefinition({ minimalData: params.minimalData }),
                // Renovación y sustitución de vehiculos v?
                // TODO: Add all nodes
                ...templatesDefinition.getRenovacionSustitucionVehiculosDefinition({ minimalData: params.minimalData }),
                // Certificado de destrucción v1.0
                // TODO: Add all nodes
                ...templatesDefinition.getCertificadoDestruccionDefinition({ minimalData: params.minimalData }),
                // Obras de arte plásticas y antigüedades v1.0
                ...templatesDefinition.getObrasArteAntiguedadesDefinition({ minimalData: params.minimalData }),
                // Comercio exterior v1.0 and v1.1
                // TODO: Add all nodes
                ...templatesDefinition.getComercioExterior10Definition({ minimalData: params.minimalData }),
                ...templatesDefinition.getComercioExterior11Definition({ minimalData: params.minimalData }),
                // INE v1.0 and 1.1
                // TODO: Add all nodes
                ...templatesDefinition.getIneDefinition({ minimalData: params.minimalData }),
            }
        };
    }

    public static getComplementsRetencionDefinition(params: tMinimalData) {
        return {
            nodes: {
                ...templatesDefinition.getTimbreDefinition({ minimalData: params.minimalData }),
                ...templatesDefinition.getPlataformasTecnologicas10Definition({ minimalData: params.minimalData}),
                ...templatesDefinition.getArriendoFideicomiso10Definition({ minimalData: params.minimalData}),
                ...templatesDefinition.getDividendos10Definition({ minimalData: params.minimalData}),
                ...templatesDefinition.getEnajenacionDeAcciones10Definition({ minimalData: params.minimalData}),
                ...templatesDefinition.getFideicomisoNoEmpresarial10Definition({ minimalData: params.minimalData}),
                ...templatesDefinition.getIntereses10Definition({ minimalData: params.minimalData}),
                ...templatesDefinition.getInteresesHipotecarios10Definition({ minimalData: params.minimalData}),
                ...templatesDefinition.getOperacionesConDerivados10Definition({ minimalData: params.minimalData}),
                ...templatesDefinition.getPagosAExtranjeros10Definition({ minimalData: params.minimalData}),
                ...templatesDefinition.getPlanesDeRetiro10Definition({ minimalData: params.minimalData}),
                ...templatesDefinition.getPremios10Definition({ minimalData: params.minimalData}),
                ...templatesDefinition.getSectorFinanciero10Definition({ minimalData: params.minimalData}),
            }
        };
    }

}
