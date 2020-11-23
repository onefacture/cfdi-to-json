import enajenacionDeAcciones10Template from "../retenciones.enajenacionDeAcciones10";
describe("Aerolineas data test", () => {
  it("Execute without params", () => {
    expect(enajenacionDeAcciones10Template()).toEqual({
      "enajenaciondeacciones:EnajenaciondeAcciones": {
        position: "enajenacionDeAcciones",
        attributes: [
          "version",
          "contratoIntermediacion",
          "ganancia",
          "perdida",
        ]
      }
    });
  });

  it("Execute with minimalData true", () => {
    expect(
      enajenacionDeAcciones10Template({
        minimalData: true
      })
    ).toEqual({
      "enajenaciondeacciones:EnajenaciondeAcciones": {
        position: "enajenacionDeAcciones",
        attributes: ["version"]
      }
    });
  });

  it("Execute with minimalData false", () => {
    expect(
      enajenacionDeAcciones10Template({
        minimalData: false
      })
    ).toEqual({
      "enajenaciondeacciones:EnajenaciondeAcciones": {
        position: "enajenacionDeAcciones",
        attributes: [
          "version",
          "contratoIntermediacion",
          "ganancia",
          "perdida",
        ]
      }
    });
  });
});
