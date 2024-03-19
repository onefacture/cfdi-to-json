import * as fs      from 'fs';
import * as htmlEntity  from 'he';
import XMLExtract   from './../XmlExtractData';
import * as templatesDefinition from './templates';
import {
    tImpuesto, tMinimalData
} from '@OwnTypes';
import { initOverrides } from './utils/override-functions';

var __templates_definitions__ :any = { };
const regexInvalidCommas = /(=“|” )/g;
const regexInvalidOpenCommas = /(“)/g;
const regexInvalidCloseCommas = /(”)/g;
const emptyArray: any = [];

initOverrides();

export default class CfdiExtractData {

    public static extractGeneralData(params: {
        path?: any, contentXML?: any, minimalData?: Boolean, hasPreviousReadError?: Boolean,
        excludeAttributesFromRoot?: Array<String>, excludeTfdAttributes?: Array<String>,
        includeRelacionados?: Boolean
    }): any {
        let contentXML = params.contentXML;
        if(params.path) {
            if(fs.existsSync(params.path)) {
                contentXML = fs.readFileSync(params.path, 'utf8');
            } else {
                throw {
                    error:   'FILE_NOT_FOUND',
                    code:    'FILE_NOT_FOUND',
                    message: 'No se encontró el archivo XML',
                    data: {
                        path: params.path,
                    }
                };
            }
        }

        if(contentXML.length <= 1) {
            throw {
                error:      'EMPTY_FILE_CONTENT',
                code:       'EMPTY_FILE_CONTENT',
                message:    'El archivo XML está vacio',
                data: {
                    path:       params.path,
                    contentXML: params.contentXML,
                }
            };
        }

        // let invalidCommasMatches      = contentXML.match(regexInvalidCommas);
        // let invalidOpenCommasMatches  = contentXML.match(regexInvalidOpenCommas);
        // let invalidClaseCommasMatches = contentXML.match(regexInvalidCloseCommas);
        // if(invalidCommasMatches && !(
        //     invalidOpenCommasMatches && invalidClaseCommasMatches &&
        //     invalidOpenCommasMatches.length === invalidClaseCommasMatches.length
        // )) {
        //     console.log('Entró en el IF de commas');
        //     // if(invalidCommasMatches.length > 1) {
        //     //     contentXML = contentXML.replace(regexInvalidCommas, '\"');
        //     // } else {
        //     //     contentXML = contentXML.replace(regexInvalidCommas, '&quot;');
        //     // }
        // }

        let isRetencion   = contentXML.indexOf('retenciones:Retenciones') >= 0;
        let data: any     = {};
        let xmlExtract    = new XMLExtract(contentXML);
        let option :any   = CfdiExtractData.getXMLVersion(xmlExtract, { isRetencion });
        let extractMethod = null;

        switch (option.version) {
            case "1.0":
                extractMethod = CfdiExtractData.extractDataRetencion10.bind(CfdiExtractData);
                break;
            case "2.0":
                if(isRetencion) {
                    extractMethod = CfdiExtractData.extractDataRetencion20.bind(CfdiExtractData);
                    break;
                }
            case "3.0":
            case "3.1":
            case "3.2":
                extractMethod = CfdiExtractData.extractDataCFDI32.bind(CfdiExtractData);
                break;
            case "3.3":
                extractMethod = CfdiExtractData.extractDataCFDI33.bind(CfdiExtractData);
                break;
            case "4.0":
                extractMethod = CfdiExtractData.extractDataCFDI40.bind(CfdiExtractData);
                break;
            default:
                if(!params.hasPreviousReadError && contentXML) {
                    // Esto es arriesgado porque puede haber carácteres raros pero esperemos que no cause problemas
                    return CfdiExtractData.extractGeneralData({
                        ...params, hasPreviousReadError: true,
                        path: null, contentXML: htmlEntity.decode(contentXML)
                    });
                }

                throw {
                    error:      'UNSUPPORTED_XML_VERSION',
                    code:       'UNSUPPORTED_XML_VERSION',
                    message:    `${option.version} Invalid version`,
                    data: {
                        version:    option.version,
                        path:       params.path,
                        contentXML: params.contentXML,
                        option
                    }
                };
        }

        data = extractMethod({
            xmlExtract,
            minimalData: params.minimalData,
            includeRelacionados: params.includeRelacionados,
            excludeAttributesFromRoot: params.excludeAttributesFromRoot || emptyArray,
            excludeTfdAttributes: params.excludeTfdAttributes || emptyArray
        });

        if(data.emisor && data.emisor.rfc)     {
            data.emisor.rfc = htmlEntity.decode(data.emisor.rfc);
        }
    
        if(data.receptor && data.receptor.rfc) {
            data.receptor.rfc = htmlEntity.decode(data.receptor.rfc);
        }

        if(data.nominas && data.nominas.length) {
            data.nominas = data.nominas.map((nomina: any) => Object.assign({}, nomina, {
                emisor: Object.assign({ }, nomina.emisor || { }, {
                    rfcPatronOrigen: htmlEntity.decode(nomina.emisor ? (nomina.emisor.rfcPatronOrigen || '') : '')
                })
            }));
        }

        if(data.relacionados && data.relacionados.length) {
            data.relacionados = data.relacionados.map((item: any) => ({
                ...item,
                uuids: item.uuids && item.uuids.length ? item.uuids.map((_item: any) => _item.uuid): item.relacionados,
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

    public static getByCustomTemplateDefinition(params: {path?: any, contentXML?: any, templateDefinition: any}) {
        let contentXML = params.contentXML;
        if(params.path) {
            if(fs.existsSync(params.path)) {
                contentXML = fs.readFileSync(params.path, 'utf8');
            } else {
                return { error: 'FILE_NOT_FOUND' };
            }
        }

        const xmlExtract = new XMLExtract(contentXML);
        const data       = xmlExtract.extractData(params.templateDefinition);

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
        const timbreDefinition = templatesDefinition.getTimbreDefinition({ minimalData: true });

        if(!__templates_definitions__.getUuidByXML) {
            __templates_definitions__.getUuidByXML = {
                /*
                * Algunos XMLs en especial los viejitos tenian estructuras distintas al estandar
                ***/
                'Comprobante | cfdi:Comprobante': {
                    nodes: {
                        'Complemento': {
                            nodes: timbreDefinition
                        },
                    }
                },
            }
        }

        const data: any = xmlExtract.extractData(__templates_definitions__.getUuidByXML);
        
        return data.uuid;
    }

    public static getXMLVersion(xmlExtract: XMLExtract, params?: { isRetencion: any }) {
        if(params && params.isRetencion) {
            if(!__templates_definitions__.getXMLVersionRetencion) {
                __templates_definitions__.getXMLVersionRetencion = {
                    'retenciones:Retenciones': {
                        attributes: [ 'version' ]
                    }
                };
            }

            return xmlExtract.extractData(__templates_definitions__.getXMLVersionRetencion);
        }

        if(!__templates_definitions__.getXMLVersion) {
            __templates_definitions__.getXMLVersion = {
                'Comprobante | cfdi:Comprobante': {
                    attributes: [ 'version' ]
                }
            };
        }

        return xmlExtract.extractData(__templates_definitions__.getXMLVersion);
    }

    public static extractDataCFDI32(params: {
        xmlExtract: XMLExtract, minimalData: Boolean, customTemplateDefinition?: Object,
        excludeAttributesFromRoot: Array<any>, excludeTfdAttributes: Array<any>
    }) {
        let data, complementsDefinition = this.getComplementsDefinition({
            minimalData: params.minimalData, excludeTfdAttributes: params.excludeTfdAttributes
        });
        let templatesDefinitionPosition = `extractDataCFDI32${params.minimalData ? 'Min' : ''}`;
        if(params.excludeAttributesFromRoot && params.excludeAttributesFromRoot.length) {
            templatesDefinitionPosition += `exclude(${params.excludeAttributesFromRoot.join(',')})`;
        }

        if(params.excludeTfdAttributes && params.excludeTfdAttributes.length) {
            templatesDefinitionPosition += `exclude(${params.excludeTfdAttributes.join(',')})`;
        }

        templatesDefinitionPosition = templatesDefinitionPosition.hashCode();

        if(params.minimalData) {
            if(!__templates_definitions__[templatesDefinitionPosition]) {
                __templates_definitions__[templatesDefinitionPosition] = {
                    'Comprobante | cfdi:Comprobante': {
                        attributes: [
                            'version', 'fecha', 'formaDePago', 'metodoDePago', 'tipoDeComprobante'
                        ],
                        nodes: {
                            'Emisor': {
                                position: 'emisor',
                                attributes: ['rfc'],
                            },
                            'Receptor': {
                                position: 'receptor',
                                attributes: ['rfc'],
                            },
                            'Conceptos': {
                                nodes: {
                                    'Concepto': {
                                        position: 'conceptos',
                                        strictArrayResponse: true,
                                        nodes: {
                                            'ComplementoConcepto': this.getConceptsComplementsDefinition({ minimalData: params.minimalData }),
                                        }
                                    }
                                }
                            },
                            'Complemento': complementsDefinition,
                        }
                    }
                };
            }

            /*
            *    Esta condicional es para obtener unicamente los datos necesarios
            *    para registrar en base de datos
            */
            return params.xmlExtract.extractData(__templates_definitions__[templatesDefinitionPosition]);
        }

        if(!__templates_definitions__[templatesDefinitionPosition]) {
            let arrayAddress = [
                'calle','noExterior','noInterior','colonia','municipio','localidad','estado','pais','codigoPostal'
            ];

            let conceptosDefinition = this.getConcepts32Definition(params);

            __templates_definitions__[templatesDefinitionPosition] = {
                'Comprobante | cfdi:Comprobante': {
                    attributes: [
                        'version', 'serie', 'sello', 'folio', 'fecha', 'formaDePago',
                        'metodoDePago', /*'subTotal', 'total',*/ 'certificado',
                        'noCertificado', 'tipoDeComprobante', 'moneda', /*'tipoCambio',*/
                        /*'descuento',*/ 'motivoDescuento', 'lugarExpedicion', 'numCtaPago'
                    ].excludeAttributes(params.excludeAttributesFromRoot),
                    parseToFloat: [
                        'subTotal', 'total', 'tipoCambio', 'descuento'
                    ],
                    nodes: {
                        'Emisor': {
                            position: 'emisor',
                            attributes: ['nombre', 'rfc'],
                            nodes: {
                                'DomicilioFiscal': {
                                    position: 'domicilioFiscal',
                                    attributes: arrayAddress
                                },
                                'ExpedidoEn': {
                                    position: 'expedidoEn',
                                    attributes: arrayAddress
                                },
                                'RegimenFiscal': {
                                    attributes: ['regimen']
                                }
                            }
                        },
                        'Receptor': {
                            position: 'receptor',
                            attributes: ['nombre','rfc'],
                            nodes: {
                                'Domicilio': {
                                    position: 'domicilio',
                                    attributes: arrayAddress
                                }
                            }
                        },
                        'Conceptos': conceptosDefinition,
                        'Impuestos': templatesDefinition.getImpuestosDefinition(),
                        'Complemento': complementsDefinition,
                    }
                }
            };
        }

        data = params.xmlExtract.extractData(__templates_definitions__[templatesDefinitionPosition]);

        if(data.impuestos && data.impuestos.traslados) {
            if(data.impuestos.totalImpuestosTrasladados) {
                data.impuestos.totalImpuestosTrasladados = parseFloat(data.impuestos.totalImpuestosTrasladados);
            }

            data.impuestos.traslados   = CfdiExtractData.getTaxesWithoutDuplicates(data.impuestos.traslados);
        }

        if(data.impuestos && data.impuestos.retenciones) {
            if(data.impuestos.totalImpuestosRetenidos) {
                data.impuestos.totalImpuestosRetenidos = parseFloat(data.impuestos.totalImpuestosRetenidos);
            }

            data.impuestos.retenciones = CfdiExtractData.getTaxesWithoutDuplicates(data.impuestos.retenciones);
        }

        return data;
    }

    public static extractDataCFDI33(params: {
        xmlExtract: XMLExtract, minimalData: Boolean, customTemplateDefinition?: Object,
        excludeAttributesFromRoot: Array<any>, excludeTfdAttributes: Array<any>,
        includeRelacionados: Boolean
    }) {
        let data, complementsDefinition = this.getComplementsDefinition({
            minimalData: params.minimalData, excludeTfdAttributes: params.excludeTfdAttributes,
            includeRelacionados: params.includeRelacionados,
        });
        let templatesDefinitionPosition = `extractDataCFDI33${params.minimalData ? 'Min' : ''}`;
        if(params.excludeAttributesFromRoot && params.excludeAttributesFromRoot.length) {
            templatesDefinitionPosition += `exclude(${params.excludeAttributesFromRoot.join(',')})`;
        }

        if(params.excludeTfdAttributes && params.excludeTfdAttributes.length) {
            templatesDefinitionPosition += `exclude(${params.excludeTfdAttributes.join(',')})`;
        }

        if(params.includeRelacionados) {
            templatesDefinitionPosition += 'and-relacionados';
        }

        templatesDefinitionPosition = templatesDefinitionPosition.hashCode();

        if(params.minimalData) {
            if(!__templates_definitions__[templatesDefinitionPosition]) {
                __templates_definitions__[templatesDefinitionPosition] = {
                    'Comprobante | cfdi:Comprobante': {
                        attributes: [
                            'version', 'fecha', 'formaPago', 'metodoPago', 'tipoDeComprobante'
                        ],
                        nodes: {
                            ...templatesDefinition.getCfdiRelacionadosDefinition(),
                            'Emisor': {
                                position: 'emisor',
                                attributes: ['rfc'],
                            },
                            'Receptor': {
                                position: 'receptor',
                                attributes: ['rfc', 'usoCFDI'],
                            },
                            'Conceptos': {
                                nodes: {
                                    'Concepto': {
                                        position: 'conceptos',
                                        strictArrayResponse: true,
                                        nodes: {
                                            'ComplementoConcepto': this.getConceptsComplementsDefinition({ minimalData: params.minimalData }),
                                        }
                                    }
                                }
                            },
                            'Complemento': complementsDefinition,
                        }
                    }
                };
            }

            /* 
            *    Esta condicional es para obtener unicamente los datos necesarios
            *    para registrar en base de datos
            */
            return params.xmlExtract.extractData(__templates_definitions__[templatesDefinitionPosition]);
        }

        if(!__templates_definitions__[templatesDefinitionPosition]) {
            let conceptosDefinition = this.getConcepts33Definition(params);

            __templates_definitions__[templatesDefinitionPosition] = {
                'Comprobante | cfdi:Comprobante': {
                    attributes: [
                       'version', 'serie', 'folio', 'fecha', 'sello', 'formaPago', 'noCertificado',
                       'certificado','condicionesDePago',/*'subTotal','descuento',*/'moneda',
                       /*'tipoCambio','total',*/'tipoDeComprobante', 'metodoPago','lugarExpedicion', 'confirmacion'
                    ].excludeAttributes(params.excludeAttributesFromRoot),
                    parseToFloat: [
                        'subTotal', 'total', 'tipoCambio', 'descuento'
                    ],
                    nodes: {
                        ...templatesDefinition.getCfdiRelacionadosDefinition(),
                        'Emisor': {
                            position: 'emisor',
                            attributes: ['nombre', 'rfc', 'regimenFiscal']
                        },
                        'Receptor': {
                            position: 'receptor',
                            attributes: ['nombre', 'rfc', 'residenciaFiscal', 'numRegIdTrib', 'usoCFDI']
                        },
                        'Conceptos': conceptosDefinition,
                        'Impuestos': templatesDefinition.getImpuestosDefinition(),
                        'Complemento': complementsDefinition,
                    }
                }
            };
        }

        data = params.xmlExtract.extractData(__templates_definitions__[templatesDefinitionPosition]);

        if(data.impuestos && data.impuestos.traslados) {
            if(data.impuestos.totalImpuestosTrasladados) {
                data.impuestos.totalImpuestosTrasladados = parseFloat(data.impuestos.totalImpuestosTrasladados);
            }

            data.impuestos.traslados   = CfdiExtractData.getTaxesWithoutDuplicates(data.impuestos.traslados);
        }

        if(data.impuestos && data.impuestos.retenciones) {
            if(data.impuestos.totalImpuestosRetenidos) {
                data.impuestos.totalImpuestosRetenidos = parseFloat(data.impuestos.totalImpuestosRetenidos);
            }

            data.impuestos.retenciones = CfdiExtractData.getTaxesWithoutDuplicates(data.impuestos.retenciones);
        }

        return data;
    }

    public static extractDataCFDI40(params: {
        xmlExtract: XMLExtract, minimalData: Boolean, customTemplateDefinition?: Object,
        excludeAttributesFromRoot: Array<any>, excludeTfdAttributes: Array<any>,
        includeRelacionados: Boolean
    }) {
        let data, complementsDefinition = this.getComplementsDefinition({
            minimalData: params.minimalData, excludeTfdAttributes: params.excludeTfdAttributes,
            includeRelacionados: params.includeRelacionados,
        });
        let templatesDefinitionPosition = `extractDataCFDI40{params.minimalData ? 'Min' : ''}`;
        if(params.excludeAttributesFromRoot && params.excludeAttributesFromRoot.length) {
            templatesDefinitionPosition += `exclude(${params.excludeAttributesFromRoot.join(',')})`;
        }

        if(params.excludeTfdAttributes && params.excludeTfdAttributes.length) {
            templatesDefinitionPosition += `exclude(${params.excludeTfdAttributes.join(',')})`;
        }

        if(params.includeRelacionados) {
            templatesDefinitionPosition += 'and-relacionados';
        }

        templatesDefinitionPosition = templatesDefinitionPosition.hashCode();

        if(params.minimalData) {
            if(!__templates_definitions__[templatesDefinitionPosition]) {
                __templates_definitions__[templatesDefinitionPosition] = {
                    'Comprobante | cfdi:Comprobante': {
                        attributes: [
                            'version', 'fecha', 'formaPago', 'metodoPago', 'tipoDeComprobante'
                        ],
                        nodes: {
                            'InformacionGlobal': {
                                position: 'informacionAdicional',
                                attributes: ['periodicidad', 'meses', 'año'],
                            },
                            ...templatesDefinition.getCfdiRelacionadosDefinition(),
                            'Emisor': {
                                position: 'emisor',
                                attributes: ['rfc'],
                            },
                            'Receptor': {
                                position: 'receptor',
                                attributes: ['rfc', 'usoCFDI'],
                            },
                            'Conceptos': {
                                nodes: {
                                    'Concepto': {
                                        position: 'conceptos',
                                        strictArrayResponse: true,
                                        nodes: {
                                            'ComplementoConcepto': this.getConceptsComplementsDefinition({ minimalData: params.minimalData }),
                                        }
                                    }
                                }
                            },
                            'Complemento': complementsDefinition,
                        }
                    }
                };
            }

            /* 
            *    Esta condicional es para obtener unicamente los datos necesarios
            *    para registrar en base de datos
            */
            return params.xmlExtract.extractData(__templates_definitions__[templatesDefinitionPosition]);
        }

        if(!__templates_definitions__[templatesDefinitionPosition]) {
            let conceptosDefinition = this.getConcepts40Definition(params);

            __templates_definitions__[templatesDefinitionPosition] = {
                'Comprobante | cfdi:Comprobante': {
                    attributes: [
                       'version','serie','folio','fecha','sello','formaPago','noCertificado',
                       'certificado','condicionesDePago',/*'subTotal','descuento',*/'moneda',
                       /*'tipoCambio', 'total',*/'tipoDeComprobante', 'exportacion',
                       'metodoPago','lugarExpedicion','confirmacion'
                    ].excludeAttributes(params.excludeAttributesFromRoot),
                    parseToFloat: [
                        'subTotal', 'total', 'tipoCambio', 'descuento'
                    ],
                    nodes: {
                        'InformacionGlobal': {
                            position: 'informacionAdicional',
                            attributes: ['periodicidad', 'meses', 'año'],
                        },
                        ...templatesDefinition.getCfdiRelacionadosDefinition(),
                        'Emisor': {
                            position: 'emisor',
                            attributes: ['nombre', 'rfc', 'regimenFiscal', 'facAtrAdquirente']
                        },
                        'Receptor': {
                            position: 'receptor',
                            attributes: ['nombre', 'rfc', 'domicilioFiscalReceptor', 'residenciaFiscal', 'numRegIdTrib', 'regimenFiscalReceptor', 'usoCFDI']
                        },
                        'Conceptos': conceptosDefinition,
                        'Impuestos': templatesDefinition.getImpuestosDefinition(),
                        'Complemento': complementsDefinition,
                    }
                }
            };
        }

        data = params.xmlExtract.extractData(__templates_definitions__[templatesDefinitionPosition]);

        if(data.impuestos && data.impuestos.traslados) {
            if(data.impuestos.totalImpuestosTrasladados) {
                data.impuestos.totalImpuestosTrasladados = parseFloat(data.impuestos.totalImpuestosTrasladados);
            }

            data.impuestos.traslados   = CfdiExtractData.getTaxesWithoutDuplicates(data.impuestos.traslados);
        }

        if(data.impuestos && data.impuestos.retenciones) {
            if(data.impuestos.totalImpuestosRetenidos) {
                data.impuestos.totalImpuestosRetenidos = parseFloat(data.impuestos.totalImpuestosRetenidos);
            }

            data.impuestos.retenciones = CfdiExtractData.getTaxesWithoutDuplicates(data.impuestos.retenciones);
        }

        return data;
    }

    public static extractDataRetencion10(params: { xmlExtract: XMLExtract, minimalData: Boolean, customTemplateDefinition?: Object }) {
        let data, complementsDefinition = this.getComplementsRetencionDefinition({ minimalData: params.minimalData });
        let templatesDefinitionPosition = `extractDataRetencion10${params.minimalData ? 'Min' : ''}`;

        templatesDefinitionPosition = templatesDefinitionPosition.hashCode();

        if(params.minimalData) {
            if(!__templates_definitions__[templatesDefinitionPosition]) {
                __templates_definitions__[templatesDefinitionPosition] = {
                    'Retenciones | retenciones:Retenciones': {
                        attributes: [ 'version' ],
                        nodes: {
                            'Emisor': {
                                position: 'emisor',
                                attributes: ['rfcEmisor', 'nomDenRazSocE'],
                            },
                            'Receptor': {
                                position: 'receptor',
                                attributes: ['nacionalidad'],
                                nodes: {
                                    'Nacional': {
                                        attributes: ['rfcRecep'],
                                    },
                                    'Extranjero': {
                                        attributes: ['numRegIdTrib'],
                                    }
                                }
                            },
                            'Complemento': complementsDefinition,
                        }
                    }
                };
            }

            return params.xmlExtract.extractData(__templates_definitions__[templatesDefinitionPosition]);
        }

        if(!__templates_definitions__[templatesDefinitionPosition]) {
            __templates_definitions__[templatesDefinitionPosition] = {
                'Retenciones | retenciones:Retenciones': {
                    attributes: [
                        'version', 'folioInt', 'sello', 'numCert', 'cert',
                        'fechaExp', 'cveRetenc',/* 'descRetenc',*/
                    ],
                    parseToFloat: [ 'descRetenc' ],
                    nodes: {
                        'Emisor': {
                            position: 'emisor',
                            attributes: ['rfcEmisor', 'nomDenRazSocE', 'curpe'],
                        },
                        'Receptor': {
                            position: 'receptor',
                            attributes: ['nacionalidad'],
                            nodes: {
                                'Nacional': {
                                    attributes: [ 'rfcRecep', 'nomDenRazSocR', 'curpr' ],
                                },
                                'Extranjero': {
                                    attributes: ['numRegIdTrib', 'nomDenRazSocR'],
                                }
                            }
                        },
                        'Periodo': {
                            position: 'periodo',
                            attributes: ['mesIni', 'mesFin', 'ejerc'],
                        },
                        'Totales': {
                            position: 'totales',
                            parseToFloat: [
                                'montoTotOperacion', 'montoTotGrav', 'montoTotExent', 'montoTotRet'
                            ],
                            nodes: {
                                'ImpRetenidos': {
                                    strictArrayResponse: true,
                                    position: 'impuestosRetenidos',
                                    attributes: [ /*'baseRet',*/ 'impuesto', /*'montoRet',*/ 'tipoPagoRet' ],
                                    parseToFloat: [ 'baseRet', 'montoRet' ],
                                },
                            }
                        },
                        'Complemento': complementsDefinition,
                    }
                }
            };
        }

        return params.xmlExtract.extractData(__templates_definitions__[templatesDefinitionPosition]);
    }

    public static extractDataRetencion20(params: { xmlExtract: XMLExtract, minimalData: Boolean, customTemplateDefinition?: Object }) {
        let data, complementsDefinition = this.getComplementsRetencionDefinition({ minimalData: params.minimalData });
        let templatesDefinitionPosition = `extractDataRetencion20${params.minimalData ? 'Min' : ''}`;

        templatesDefinitionPosition = templatesDefinitionPosition.hashCode();

        if(params.minimalData) {
            if(!__templates_definitions__[templatesDefinitionPosition]) {
                __templates_definitions__[templatesDefinitionPosition] = {
                    'Retenciones | retenciones:Retenciones': {
                        attributes: [ 'version' ],
                        nodes: {
                            'Emisor': {
                                position: 'emisor',
                                attributes: ['rfcEmisor', 'rfcE', 'nomDenRazSocE', 'regimenFiscalE'],
                            },
                            'Receptor': {
                                position: 'receptor',
                                attributes: ['nacionalidad', 'nacionalidadR'],
                                nodes: {
                                    'Nacional': {
                                        attributes: ['rfcRecep', 'rfcR'],
                                    },
                                    'Extranjero': {
                                        attributes: ['numRegIdTrib'],
                                    }
                                }
                            },
                            'Complemento': complementsDefinition,
                        }
                    }
                };
            }

            return params.xmlExtract.extractData(__templates_definitions__[templatesDefinitionPosition]);
        }

        if(!__templates_definitions__[templatesDefinitionPosition]) {
            __templates_definitions__[templatesDefinitionPosition] = {
                'Retenciones | retenciones:Retenciones': {
                    attributes: [
                        'version', 'folioInt', 'sello', 'numCert', 'cert', 'certificado',
                        'noCertificado', 'LugarExpRetenc', 'fechaExp', 'cveRetenc', 'descRetenc',
                    ],
                    nodes: {
                        'Emisor': {
                            position: 'emisor',
                            attributes: [
                                'rfcEmisor', 'nomDenRazSocE', 'curpe', 'regimenFiscalE',
                                'rfcE',
                            ],
                        },
                        'Receptor': {
                            position: 'receptor',
                            attributes: ['nacionalidad', 'nacionalidadR'],
                            nodes: {
                                'Nacional': {
                                    attributes: [
                                        'rfcR', 'rfcRecep', 'nomDenRazSocR', 'curpr', 'domicilioFiscalR'
                                    ],
                                },
                                'Extranjero': {
                                    attributes: ['numRegIdTrib', 'nomDenRazSocR'],
                                }
                            }
                        },
                        'Periodo': {
                            position: 'periodo',
                            attributes: ['mesIni', 'mesFin', 'ejerc', 'ejercicio'],
                        },
                        'Totales': {
                            position: 'totales',
                            parseToFloat: [
                                'montoTotOperacion', 'montoTotGrav', 'montoTotExent', 'montoTotRet',
                                'utilidadBimestral', 'isrCorrespondiente'
                            ],
                            nodes: {
                                'ImpRetenidos': {
                                    strictArrayResponse: true,
                                    position: 'impuestosRetenidos',
                                    attributes: [
                                        /*'baseRet', */'impuesto', 'impuestoRet',
                                        /*'montoRet', */'tipoPagoRet'
                                    ],
                                    parseToFloat: [ 'baseRet', 'montoRet' ]
                                },
                            }
                        },
                        'Complemento': complementsDefinition,
                        // TODO: 'Addenda': {}
                    }
                }
            };
        }

        return params.xmlExtract.extractData(__templates_definitions__[templatesDefinitionPosition]);
    }

    public static getTaxesWithoutDuplicates(taxes: Array<tImpuesto>) {
        let localTaxes: any = {}, tax: tImpuesto, result = [], taxesCopy = taxes.map((tax: tImpuesto) => { return (<any> Object).assign({}, tax); });
        for(tax of taxesCopy) {
            let importe  = tax.importe ? parseFloat(tax.importe) : tax.importe;
            let base     = tax.base ? parseFloat(tax.base) : tax.base;
            tax.impuesto = tax.impuesto.toUpperCase();
            let taxPosition = tax.impuesto + (tax.tasa || tax.tasaOCuota);

            if(!localTaxes[taxPosition]) {
                localTaxes[taxPosition] = tax;

                if(importe) {
                    localTaxes[taxPosition].importe = importe;
                }
            } else {
                if(importe) {
                    localTaxes[taxPosition].importe += importe;
                }

                if(base) {
                    localTaxes[taxPosition].base += base;
                }
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

    public static getConcepts32Definition(params: { minimalData: Boolean }) {
        return {
            nodes: {
                'Concepto': {
                    position: 'conceptos',
                    strictArrayResponse: true,
                    attributes: [
                        /*'cantidad', */'unidad', 'descripcion',
                        /*'valorUnitario', 'importe'*/
                    ],
                    parseToFloat: [ 'cantidad', 'valorUnitario', 'importe' ],
                    nodes: {
                        'CuentaPredial': {
                            position: 'cuentaPredial',
                            attributes: ['numero']
                        },
                        'InformacionAduanera': {
                            position: 'informacionAduanera',
                            attributes: ['numero', 'fecha', 'aduana']
                        },
                        'ComplementoConcepto': this.getConceptsComplementsDefinition({ minimalData: params.minimalData }),
                        'Parte': {
                            position: 'partes',
                            strictArrayResponse: true,
                            attributes: [
                                /*'cantidad', */'unidad', 'noIdentificacion', 'descripcion',
                                /*'valorUnitario', 'importe'*/
                            ],
                            parseToFloat: [ 'cantidad', 'valorUnitario', 'importe' ],
                            nodes: {
                                'InformacionAduanera': {
                                    position: 'informacionAduanera',
                                    attributes: ['numero', 'fecha', 'aduana']
                                },
                            }
                        }
                    }
                }
            }
        }
    }

    public static getConcepts33Definition(params: { minimalData: Boolean }) {
        return {
            nodes: {
                'Concepto': {
                    position: 'conceptos',
                    strictArrayResponse: true,
                    attributes: [
                        'claveProdServ','noIdentificacion',/*'cantidad',*/'claveUnidad',
                        'unidad','descripcion',/*'valorUnitario','importe','descuento'*/
                    ],
                    parseToFloat: [
                        'cantidad', 'valorUnitario', 'importe', 'descuento'
                    ],
                    nodes: {
                        'CuentaPredial': {
                            position: 'cuentaPredial',
                            attributes: ['numero']
                        },
                        'InformacionAduanera': {
                            position: 'informacionAduanera',
                            attributes: ['numero', 'fecha', 'aduana', 'numeroPedimento']
                        },
                        'ComplementoConcepto': this.getConceptsComplementsDefinition({ minimalData: params.minimalData }),
                        'Parte': {
                            position: 'partes',
                            strictArrayResponse: true,
                            attributes: [
                                'cantidad', 'unidad', 'noIdentificacion', 'descripcion',
                                /*'valorUnitario', 'importe'*/
                            ],
                            parseToFloat: [ 'cantidad', 'valorUnitario', 'importe' ],
                            nodes: {
                                'InformacionAduanera': {
                                    position: 'informacionAduanera',
                                    attributes: ['numero', 'fecha', 'aduana', 'numeroPedimento']
                                },
                            }
                        },
                        'Impuestos': {
                            position: 'impuestos',
                            nodes: {
                                'Traslados': {
                                    nodes: {
                                        'Traslado': {
                                            position: 'traslados',
                                            strictArrayResponse: true,
                                            attributes: [
                                                /*'base',*/ 'impuesto', 'tipoFactor', 'tasaOCuota',
                                                /*'importe'*/
                                            ],
                                            parseToFloat: [ 'base', 'importe' ]
                                        }
                                    }
                                },
                                'Retenciones': {
                                    nodes: {
                                        'Retencion': {
                                            position: 'retenciones',
                                            strictArrayResponse: true,
                                            attributes: [
                                                /*'base',*/ 'impuesto', 'tipoFactor', 'tasaOCuota', /*'importe'*/
                                            ],
                                            parseToFloat: [ 'base', 'importe' ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
    }

    public static getConcepts40Definition(params: { minimalData: Boolean }) {
        return {
            nodes: {
                'Concepto': {
                    position: 'conceptos',
                    strictArrayResponse: true,
                    attributes: [
                        'claveProdServ','noIdentificacion',/*'cantidad',*/'claveUnidad',
                        'unidad','descripcion',/*'valorUnitario','importe','descuento',*/'objetoImp'
                    ],
                    parseToFloat: [ 'cantidad', 'valorUnitario', 'importe', 'descuento' ],
                    nodes: {
                        'CuentaPredial': {
                            position: 'cuentaPredial',
                            attributes: ['numero']
                        },
                        'InformacionAduanera': {
                            position: 'informacionAduanera',
                            attributes: ['numeroPedimento']
                        },
                        'ACuentaTerceros': {
                            position: 'aCuentaTerceros',
                            attributes: ['rfcACuentaTerceros', 'nombreACuentaTerceros', 'regimenFiscalACuentaTerceros', 'domicilioFiscalACuentaTerceros']
                        },
                        'ComplementoConcepto': this.getConceptsComplementsDefinition({ minimalData: params.minimalData }),
                        'Parte': {
                            position: 'partes',
                            strictArrayResponse: true,
                            attributes: [
                                'claveProdServ', /*'cantidad',*/ 'unidad', 'noIdentificacion',
                                'descripcion', /*'valorUnitario', 'importe'*/
                            ],
                            parseToFloat: [ 'cantidad', 'valorUnitario', 'importe' ],
                            nodes: {
                                'InformacionAduanera': {
                                    position: 'informacionAduanera',
                                    attributes: ['numeroPedimento']
                                },
                            }
                        },
                        'Impuestos': {
                            position: 'impuestos',
                            nodes: {
                                'Traslados': {
                                    nodes: {
                                        'Traslado': {
                                            position: 'traslados',
                                            strictArrayResponse: true,
                                            attributes: [
                                                /*'base',*/ 'impuesto', 'tipoFactor',
                                                'tasaOCuota',/* 'importe'*/
                                            ],
                                            parseToFloat: [ 'base', 'importe' ],
                                        }
                                    }
                                },
                                'Retenciones': {
                                    nodes: {
                                        'Retencion': {
                                            position: 'retenciones',
                                            strictArrayResponse: true,
                                            attributes: [
                                                /*'base', */'impuesto', 'tipoFactor',
                                                'tasaOCuota',/* 'importe'*/
                                            ],
                                            parseToFloat: [ 'base', 'importe' ],
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
    }

    public static getConceptsComplementsDefinition(params: tMinimalData) {
        let templatesDefinitionPosition = `getConceptsComplementsDefinition${params.minimalData ? 'Min' : ''}`;

        templatesDefinitionPosition = templatesDefinitionPosition.hashCode();

        if(!__templates_definitions__[templatesDefinitionPosition]) {
            __templates_definitions__[templatesDefinitionPosition] = {
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

        return __templates_definitions__[templatesDefinitionPosition];
    }

    public static getComplementsDefinition(params: tMinimalData) {
        let templatesDefinitionPosition = `getComplementsDefinition${params.minimalData ? 'Min' : ''}`;

        if(params.excludeTfdAttributes && params.excludeTfdAttributes.length) {
            templatesDefinitionPosition += `exclude(${params.excludeTfdAttributes.join(',')})`;
        }

        templatesDefinitionPosition = templatesDefinitionPosition.hashCode();

        if(!__templates_definitions__[templatesDefinitionPosition]) {
            __templates_definitions__[templatesDefinitionPosition] = {
                nodes: {
                    // Timbre fiscal definition
                    ...templatesDefinition.getTimbreDefinition({
                        minimalData:          params.minimalData,
                        excludeTfdAttributes: params.excludeTfdAttributes
                    }),
                    // Pagos definition
                    ...templatesDefinition.getPagosDefinition({
                        minimalData: params.minimalData && !params.includeRelacionados
                    }),
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
                    // Estado de cuenta bancario
                    ...templatesDefinition.getEstadoCuentaBancario({ minimalData: params.minimalData }),
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
                    // CartaPorte v1.0 and v2.0
                    ...templatesDefinition.getCartaPorteDefinition({ minimalData: params.minimalData }),
                    // Ingresos por hidrocarburos
                    ...templatesDefinition.getIngresosHidrocarburosDefinition({ minimalData: params.minimalData }),
                }
            };
        }

        return __templates_definitions__[templatesDefinitionPosition];
    }

    public static getComplementsRetencionDefinition(params: tMinimalData) {
        let templatesDefinitionPosition = `getComplementsRetencionDefinition${params.minimalData ? 'Min' : ''}`;

        templatesDefinitionPosition = templatesDefinitionPosition.hashCode();

        if(!__templates_definitions__[templatesDefinitionPosition]) {
            __templates_definitions__[templatesDefinitionPosition] = {
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
                    ...templatesDefinition.getPlanesDeRetiro11Definition({ minimalData: params.minimalData}),
                    ...templatesDefinition.getPremios10Definition({ minimalData: params.minimalData}),
                    ...templatesDefinition.getSectorFinanciero10Definition({ minimalData: params.minimalData}),
                }
            };
        }

        return __templates_definitions__[templatesDefinitionPosition];
    }

}
