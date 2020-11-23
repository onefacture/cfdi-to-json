import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "detallista:detallista": {
    position: "detallista",
    attributes: ["type", "contentVersion"]
  }
};

export const allDataDefinition = {
  "detallista:detallista": {
    position: "detallista",
    attributes: [
      "type",
      "contentVersion",
      "documentStructureVersion",
      "documentStatus"
    ]
    /*nodes: {
              'detallista:requestForPaymentIdentification': {
                  nodes: {
                      'detallista:entityType': {
                          textContentPosition: 'entityType',
                          strictTextContent: true,
                      }
                  }
              },
              'detallista:specialInstruction': {
                  nodes: {
                      'detallista:text': {
                          textContentPosition: 'entityType',
                          strictTextContent: true,
                      }
                  }
              },
              'detallista:orderIdentification': {},
              'detallista:AdditionalInformation': {},
              'detallista:DeliveryNote': {},
              'detallista:buyer': {},
              'detallista:seller': {},
              'detallista:shipTo': {},
              'detallista:InvoiceCreator': {},
              'detallista:Customs': {},
              'detallista:currency': {},
              'detallista:paymentTerms': {},
              'detallista:shipmentDetail': {},
              'detallista:allowanceCharge': {},
              'detallista:lineItem': {},
              'detallista:totalAmount': {},
              'detallista:TotalAllowanceCharge': {},
          }*/
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
