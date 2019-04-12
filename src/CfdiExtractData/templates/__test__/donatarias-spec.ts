import donatariasTemplate from "../donatarias";
describe("donatarias data test", () => {
  it("Execute without params", () => {
    expect(donatariasTemplate()).toEqual({
      "donat:Donatarias": {
        position: "donatarias",
        attributes: [
          "version",
          "noAutorizacion",
          "fechaAutorizacion",
          "leyenda"
        ]
      }
    });
  });
  it("Execute with minimalData: False", () => {
    expect(donatariasTemplate({ minimalData: false })).toEqual({
      "donat:Donatarias": {
        position: "donatarias",
        attributes: [
          "version",
          "noAutorizacion",
          "fechaAutorizacion",
          "leyenda"
        ]
      }
    });
  });
  it("Execute with minimalData: True", () => {
    expect(donatariasTemplate({ minimalData: true })).toEqual({
      "donat:Donatarias": {
        position: "donatarias",
        attributes: ["version"]
      }
    });
  });
});
