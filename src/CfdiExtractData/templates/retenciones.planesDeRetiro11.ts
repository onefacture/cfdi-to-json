import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "planesderetiro11:Planesderetiro": {
    position: "planesDeRetiro",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
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
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
