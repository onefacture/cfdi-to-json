import detallistaTemplate from "../detallista";
describe("Detallista data test", () => {
  it("Execute without params", () => {
    expect(detallistaTemplate()).toEqual({
      "detallista:detallista": {
        position: "detallista",
        attributes: [
          "type",
          "contentVersion",
          "documentStructureVersion",
          "documentStatus"
        ]
      }
    });
  });
  it("Execute with minimalData: False", () => {
    expect(detallistaTemplate({ minimalData: false })).toEqual({
      "detallista:detallista": {
        position: "detallista",
        attributes: [
          "type",
          "contentVersion",
          "documentStructureVersion",
          "documentStatus"
        ]
      }
    });
  });
  it("Execute with minimalData: True", () => {
    expect(detallistaTemplate({ minimalData: true })).toEqual({
      "detallista:detallista": {
        position: "detallista",
        attributes: ["type", "contentVersion"]
      }
    });
  });
});
