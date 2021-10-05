import planesDeRetiro11Template from "../retenciones.planesDeRetiro11";
describe("Retenciones planesDeRetiro11", () => {
  it("Execute without params", () => {
    expect(planesDeRetiro11Template()).toEqual({
      "planesderetiro11:Planesderetiro": {
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
          "numReferencia",
        ],
        nodes: {
          "planesderetiro11:AportacionesODepositos": {
            strictArrayResponse: true,
            position: "aportacionesODepositos",
            attributes: [
              "TipoAportacionODeposito",
              "MontAportODep",
              "RFCFiduciaria"
            ]
          }
        }
      }
    });
  });

  it("Execute with minimalData true", () => {
    expect(
      planesDeRetiro11Template({
        minimalData: true
      })
    ).toEqual({
      "planesderetiro11:Planesderetiro": {
        position: "planesDeRetiro",
        attributes: ["version"]
      }
    });
  });

  it("Execute with minimalData false", () => {
    expect(
      planesDeRetiro11Template({
        minimalData: false
      })
    ).toEqual({
      "planesderetiro11:Planesderetiro": {
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
          "numReferencia",
        ],
        nodes: {
          "planesderetiro11:AportacionesODepositos": {
            strictArrayResponse: true,
            position: "aportacionesODepositos",
            attributes: [
              "TipoAportacionODeposito",
              "MontAportODep",
              "RFCFiduciaria"
            ]
          }
        }
      }
    });
  });
});
