import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "planesderetiro:Planesderetiro": {
    position: "planesDeRetiro",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
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
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
