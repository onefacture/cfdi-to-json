import { DOMParser }  from 'xmldom';
import * as xpath   from 'xpath';
import xpathNamespaces from './xpathNamespaces';
// Define namespaces
var select = xpath.useNamespaces(xpathNamespaces);
export default class XMLExtractData {

    private doc:          Document;

    constructor(xml: string) {
        var domParser = new DOMParser();
        this.doc = domParser.parseFromString(xml);
    }

    public extractData(extractConfig: any) {
        return this.extractNodes(extractConfig);
    }

    private extractNodes(nodes: any, elements?: Array<any>) {
        let i: string, nodeName, attributes, tempObj, tempAttributes: any, position, element, innerKeys, keys = Object.keys(nodes);
        let result: any = {};
        for(i of keys) {
            if(!elements || !elements.length) {
                elements = select(i, this.doc);
            }

            tempAttributes = {};
            tempObj = elements.length > 1 ? [] : {};

            for(element of elements) {
                if(nodes[i].attributes) {
                    attributes = this.mapReduceAttributes(element);
                    tempAttributes = {};
                    for(let attrPos of nodes[i].attributes) {
                        position = attrPos.toLowerCase();
                        if(attributes[position]) {
                            tempAttributes[attrPos] = nodes[i].upperCase
                                                ? attributes[position].toUpperCase()
                                                : attributes[position];
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
