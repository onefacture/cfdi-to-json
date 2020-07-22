import { tMinimalData } from "../index.d";
export default (params?: tMinimalData) => {
  if (params && params.minimalData) {
    return {
      "planesderetiro:Planesderetiro": {
        position: "planesDeRetiro",
        attributes: ["version"]
      }
    };
  }

  return {
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
};
