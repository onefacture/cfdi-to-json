import { tMinimalData } from "../index.d";
const TimbreFiscalDigital = 'TimbreFiscalDigital';
import { initOverrides } from '../utils/override-functions';

initOverrides();

export const minimalDataDefinition = {
   [TimbreFiscalDigital]: {
    position: "timbreFiscal",
    attributes: ["fechaTimbrado", "uuid"]
   }
};

export const allDataDefinition = {
  [TimbreFiscalDigital]: {
    position: "timbreFiscal",
    attributes: [
      "fechaTimbrado",
      "uuid",
      "noCertificadoSAT",
      "selloSAT",
      "selloCFD",
      "RFCProvCertif"
    ]
  }
};

let customDefinitions: any = { };

export default (params?: tMinimalData) => {
  if(params && params.excludeTfdAttributes && params.excludeTfdAttributes.length) {
    let position = `${params && params.minimalData ? 'minimal-' : 'all-'}ext(${params.excludeTfdAttributes.join(',')})`.hashCode();

    if(!customDefinitions[position]) {
      customDefinitions[position] = {...params && params.minimalData ? minimalDataDefinition : allDataDefinition};
    }

    return {
      [TimbreFiscalDigital]: {
        ...customDefinitions[position][TimbreFiscalDigital],
        attributes: customDefinitions[position][TimbreFiscalDigital].attributes.excludeAttributes(params.excludeTfdAttributes)
      }
    };
  }

  return params && params.minimalData ? minimalDataDefinition : allDataDefinition;
}
