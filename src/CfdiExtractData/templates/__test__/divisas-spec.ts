import divisasTemplate from "../divisas";
describe("Divisas data test", () => {
  it("Execute without params", () => {
    expect(divisasTemplate()).toEqual({
      "divisas:Divisas": {
        position: "divisas",
        attributes: ["version", "tipoOperacion"]
      }
    });
  });
  it("Execute with minimalData: False", () => {
    expect(divisasTemplate({ minimalData: false })).toEqual({
      "divisas:Divisas": {
        position: "divisas",
        attributes: ["version", "tipoOperacion"]
      }
    });
  });
  it("Execute with minimalData: True", () => {
    expect(divisasTemplate({ minimalData: true })).toEqual({
      "divisas:Divisas": {
        position: "divisas",
        attributes: ["version"]
      }
    });
  });
});
