import CfdiExtractData from './CfdiExtractData';

const {
	getUuidByXML,
	getXMLVersion,
	getConcepts32Definition,
	getConcepts33Definition,
	getConcepts40Definition,
	extractGeneralData: parse,
	getByCustomTemplateDefinition: parseByCustomTemplate,
} = CfdiExtractData;

export {
	parse,
	getUuidByXML,
	getXMLVersion,
	parseByCustomTemplate,
	getConcepts32Definition,
	getConcepts33Definition,
	getConcepts40Definition,
};
