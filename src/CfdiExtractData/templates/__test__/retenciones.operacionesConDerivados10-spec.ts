import operacionesConDerivados10Template from "../retenciones.operacionesConDerivados10";
describe("Retenciones operacionesConDerivados10", () => {
  it("Execute without params", () => {
    expect(operacionesConDerivados10Template()).toEqual({
      "operacionesconderivados:Operacionesconderivados": {
        position: "operacionesConDerivados",
        attributes: [
          "version",
          "montGanAcum",
          "montPerdDed",
        ]
      }
    });
  });

  it("Execute with minimalData true", () => {
    expect(
      operacionesConDerivados10Template({
        minimalData: true
      })
    ).toEqual({
      "operacionesconderivados:Operacionesconderivados": {
        position: "operacionesConDerivados",
        attributes: ["version"]
      }
    });
  });

  it("Execute with minimalData false", () => {
    expect(
      operacionesConDerivados10Template({
        minimalData: false
      })
    ).toEqual({
      "operacionesconderivados:Operacionesconderivados": {
        position: "operacionesConDerivados",
        attributes: [
          "version",
          "montGanAcum",
          "montPerdDed",
        ]
      }
    });
  });
});
