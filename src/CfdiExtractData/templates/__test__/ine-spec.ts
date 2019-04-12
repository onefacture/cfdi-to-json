import ineTemplate from "../ine";
describe("INE data test", () => {
  it("Execute without params", () => {
    expect(ineTemplate()).toEqual({
      "ine:INE": {
        position: "ine",
        attributes: ["version", "tipoProceso", "tipoComite", "idContabilidad"]
      }
    });
  });
  it("Execute with minimalData: False", () => {
    expect(ineTemplate({ minimalData: false })).toEqual({
      "ine:INE": {
        position: "ine",
        attributes: ["version", "tipoProceso", "tipoComite", "idContabilidad"]
      }
    });
  });
  it("Execute with minimalData: True", () => {
    expect(ineTemplate({ minimalData: true })).toEqual({
      "ine:INE": {
        position: "ine",
        attributes: ["version"]
      }
    });
  });
});
