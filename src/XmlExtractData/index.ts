import { DOMParser }  from 'xmldom';
import * as xpath   from 'xpath';
import xpathNamespaces from './xpathNamespaces';
// Define namespaces
const cfdiv4Namespace = 'http://www.sat.gob.mx/cfd/4';
const retencionesv2Namespace = 'http://www.sat.gob.mx/esquemas/retencionpago/2';
const selectCfdi3 = xpath.useNamespaces(xpathNamespaces);
const selectCfdi4 = xpath.useNamespaces({
    ...xpathNamespaces,
    'cfdi': cfdiv4Namespace,
});
const selectRetenciones2 = xpath.useNamespaces({
    ...xpathNamespaces,
    'retenciones': retencionesv2Namespace,
});
const regexNamespacesV4 = /(http:\/\/www.sat.gob.mx\/cfd\/4)/g;
const regexXsdV4        = /(cfdv40\.xsd)/g;
const regexV4           = /(Version="4.0"|version="4.0")/g;

export default class XMLExtractData {

    private doc:          Document;
    private selectXpath:  Function;

    constructor(xml: string) {
        var domParser = new DOMParser();
        this.doc = domParser.parseFromString(xml);
        this.selectXpath = selectCfdi3;

        let matchesNamespacesV4 = xml.match(regexNamespacesV4);
        let matchesXsdV4        = xml.match(regexXsdV4);
        let matchesV4           = xml.match(regexV4);

        if(
            matchesV4 && matchesV4.length
            // (matchesNamespacesV4 && matchesNamespacesV4.length > 1)
            // || (matchesXsdV4 && matchesXsdV4.length === 1)
        ) {
            this.selectXpath = selectCfdi4;
        } else if(xml.indexOf(retencionesv2Namespace) > 0) {
            this.selectXpath = selectRetenciones2;
        }

        try {
            if(
                this.selectXpath != selectCfdi4 &&
                matchesV4 && matchesV4.length &&
                this.doc && this.doc.lastChild && this.doc.lastChild.attributes
            ) {
                let keys = Object.keys(this.doc.lastChild.attributes);
                let keyVersion = keys.find(key => {
                    // console.log();
                    return ['Version', 'version'].indexOf(this.doc.lastChild.attributes[key].name) >= 0
                });

                if(this.doc.lastChild.attributes[keyVersion].value === '4.0') {
                    this.selectXpath = selectCfdi4;
                }
            }
        } catch(error) { console.log(error) }
    }

    public extractData(extractConfig: any) {
        return this.extractNodes(extractConfig, []);
    }

    private extractNodes(nodes: any, elements: Array<any>) {
        let i: string, nodeName, attributes, tempObj, tempAttributes: any, position, element, innerKeys, keys = Object.keys(nodes);
        let result: any = {};
        for(i of keys) {
            if(!elements || !elements.length) {
                elements = this.selectXpath(i, this.doc) || [];
            }

            tempAttributes = {};
            tempObj = elements.length > 1 ? [] : {};

            for(element of elements) {
                if(nodes[i].attributes || nodes[i].parseToFloat) {
                    tempAttributes = {};
                }

                if(nodes[i].attributes) {
                    attributes = this.mapReduceAttributes(element);
                    for(let attrPos of nodes[i].attributes) {
                        position = attrPos.toLowerCase();
                        if(attributes[position]) {
                            tempAttributes[attrPos] = nodes[i].upperCase
                                                ? attributes[position].toUpperCase()
                                                : attributes[position];
                        }
                    }
                }

                if(nodes[i].parseToFloat) {
                    attributes = this.mapReduceAttributes(element);
                    for(let attrPos of nodes[i].parseToFloat) {
                        position = attrPos.toLowerCase();
                        if(attributes[position]) {
                            tempAttributes[attrPos] = parseFloat(attributes[position]);

                            if(isNaN(parseFloat(tempAttributes[attrPos]))) {
                                tempAttributes[attrPos] = attributes[position];
                            }
                        }
                    }
                }

                if(nodes[i].nodes) {
                    innerKeys = Object.keys(nodes[i].nodes);
                    let nodeValue = null, nodeElements;
                    for(nodeName of innerKeys) {
                        nodeElements = this.getChildNodesByTagName(element, nodeName);

                        if(!nodeElements.length) { continue; }

                        nodeValue = this.extractNodes({[nodeName]: nodes[i].nodes[nodeName]}, nodeElements);

                        if(
                            nodes[i].nodes[nodeName].position
                            && nodes[i].nodes[nodeName].position == 'nominas'
                        ) {
                            let versions = nodeValue.map((item: any) => item.version);
                            if(nodes[i].nodes[nodeName].version != versions[0]) {
                                continue;
                            }
                        }

                        if(nodes[i].nodes[nodeName].position) {
                            tempAttributes[nodes[i].nodes[nodeName].position] = nodeValue;

                            // if(
                            //     ['monto', 'importe', 'total', 'subTotal']
                            //     .indexOf(nodes[i].nodes[nodeName].position) >= 0
                            // ) {
                            //     tempAttributes[nodes[i].nodes[nodeName].position] = parseFloat(nodeValue);
                            //     if(isNaN(parseFloat(tempAttributes[nodes[i].nodes[nodeName].position]))) {
                            //         tempAttributes[nodes[i].nodes[nodeName].position] = nodeValue;
                            //     }
                            // }
                        } else {
                            tempAttributes = (<any> Object).assign({}, tempAttributes, nodeValue);
                        }
                    }
                }

                if(nodes[i].strictTextContent) {
                    tempAttributes = { [nodes[i].textContentPosition || i]: element.textContent };
                }

                if (elements.length > 1) {
                    tempObj.push(tempAttributes);
                } else {
                    tempObj = tempAttributes;
                }
            }

            if(nodes[i].strictArrayResponse) {
                result = tempObj.length ? tempObj : [tempObj];
            } else {
                if(tempObj instanceof Array) {
                    result = (<any> Object).assign({},
                                result,
                                tempObj.reduce(
                                    (prev, next) => (<any> Object).assign({}, prev, next),
                                    {}
                                )
                            );
                } else {
                    result = (<any> Object).assign({}, result, tempObj);
                }
            }
        }

        return result;
    }

    private getChildNodesByTagName(element: any, nodeName: any) {
        let array = [];
        for(let i = 0; i < element.childNodes.length; i++) {
            if(
                element.childNodes.item(i).tagName &&
                (
                    element.childNodes.item(i).tagName === nodeName ||
                    element.childNodes.item(i).localName === nodeName
                )
            ) {
                array.push(element.childNodes.item(i));
            }
        }

        return array;
    }

    private getAttributesElement(element: any) {
        let attributes = [];
        if(element.attributes) {
            for(let i = 0; i < element.attributes.length; i++) {
                attributes.push(element.attributes[i]);
            }
        }

        return attributes;
    }

    private mapReduceAttributes(element: any) {
        let length = element.attributes.length;
        let attributes: any = this.getAttributesElement(element)
        .map((attr: any) => {
            let obj: any = {};
            obj[attr.name.toLowerCase()] = attr.value;
            return obj;
        });

        if(attributes.length) {
            attributes = attributes.reduce((prev: any, next: any) => {
                return (<any> Object).assign(prev, next);
            }, {});
        }

        attributes.length = length;

        return attributes;
    }

}
