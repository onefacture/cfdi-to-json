import pagosTemplate, { __getInnerNodes } from "../pagos";
describe("Pagos data test", () => {
  it("Execute without params", () => {
    expect(pagosTemplate()).toEqual({
      "Pagos": {
        position: "pagos",
        attributes: ["version"],
        nodes: Object.assign(
          __getInnerNodes(),
        )
      },
    });
  });
  it("Execute with minimalData: False", () => {
    expect(pagosTemplate({ minimalData: false })).toEqual({
      "Pagos": {
        position: "pagos",
        attributes: ["version"],
        nodes: Object.assign(
          __getInnerNodes(),
        )
      },
    });
  });
  it("Execute with minimalData: True", () => {
    expect(pagosTemplate({ minimalData: true })).toEqual({
      "Pagos": {
        position: "pagos",
        attributes: ["version"]
      }
    });
  });
});
