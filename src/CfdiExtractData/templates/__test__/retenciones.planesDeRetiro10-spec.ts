import planesDeRetiro10Template from "../retenciones.planesDeRetiro10";
describe("Aerolineas data test", () => {
  it("Execute without params", () => {
    expect(planesDeRetiro10Template()).toEqual({
      "planesderetiro:Planesderetiro": {
        position: "planesDeRetiro",
        attributes: [
          "version",
          "sistemaFinanc",
          "montTotAportAnioInmAnterior",
          "montIntRealesDevengAniooInmAnt",
          "huboRetirosAnioInmAntPer",
          "montTotRetiradoAnioInmAntPer",
          "montTotExentRetiradoAnioInmAnt",
          "montTotExedenteAnioInmAnt",
          "huboRetirosAnioInmAnt",
          "montTotRetiradoAnioInmAnt",
        ]
      }
    });
  });

  it("Execute with minimalData true", () => {
    expect(
      planesDeRetiro10Template({
        minimalData: true
      })
    ).toEqual({
      "planesderetiro:Planesderetiro": {
        position: "planesDeRetiro",
        attributes: ["version"]
      }
    });
  });

  it("Execute with minimalData false", () => {
    expect(
      planesDeRetiro10Template({
        minimalData: false
      })
    ).toEqual({
      "planesderetiro:Planesderetiro": {
        position: "planesDeRetiro",
        attributes: [
          "version",
          "sistemaFinanc",
          "montTotAportAnioInmAnterior",
          "montIntRealesDevengAniooInmAnt",
          "huboRetirosAnioInmAntPer",
          "montTotRetiradoAnioInmAntPer",
          "montTotExentRetiradoAnioInmAnt",
          "montTotExedenteAnioInmAnt",
          "huboRetirosAnioInmAnt",
          "montTotRetiradoAnioInmAnt",
        ]
      }
    });
  });
});
