import pagosTemplate, { __getInnerNodesWithCustomNamespace } from "../pagos";
describe("Pagos data test", () => {
  it("Execute without params", () => {
    expect(pagosTemplate()).toEqual({
      "pago10:Pagos": {
        position: "pagos",
        attributes: ["version"],
        nodes: Object.assign(
          __getInnerNodesWithCustomNamespace(),
          __getInnerNodesWithCustomNamespace({ namespace: "pago10" })
        )
      },
      "Pagos": {
        position: "pagos",
        attributes: ["version"],
        nodes: Object.assign(
          __getInnerNodesWithCustomNamespace(),
          __getInnerNodesWithCustomNamespace({ namespace: "pago10" })
        )
      },
    });
  });
  it("Execute with minimalData: False", () => {
    expect(pagosTemplate({ minimalData: false })).toEqual({
      "pago10:Pagos": {
        position: "pagos",
        attributes: ["version"],
        nodes: Object.assign(
          __getInnerNodesWithCustomNamespace(),
          __getInnerNodesWithCustomNamespace({ namespace: "pago10" })
        )
      },
      "Pagos": {
        position: "pagos",
        attributes: ["version"],
        nodes: Object.assign(
          __getInnerNodesWithCustomNamespace(),
          __getInnerNodesWithCustomNamespace({ namespace: "pago10" })
        )
      },
    });
  });
  it("Execute with minimalData: True", () => {
    expect(pagosTemplate({ minimalData: true })).toEqual({
      "pago10:Pagos": {
        position: "pagos",
        attributes: ["version"]
      },
      "Pagos": {
        position: "pagos",
        attributes: ["version"]
      }
    });
  });
});
