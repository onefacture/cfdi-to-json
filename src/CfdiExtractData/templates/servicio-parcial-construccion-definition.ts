import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "servicioparcial:parcialesconstruccion": {
    position: "servicioParcial",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "servicioparcial:parcialesconstruccion": {
    position: "servicioParcial",
    attributes: ["version", "numPerLicoAut"],
    nodes: {
      "servicioparcial:Inmueble": {
        attributes: [
          "calle",
          "noExterior",
          "noInterior",
          "colonia",
          "localidad",
          "referencia",
          "municipio",
          "estado",
          "codigoPostal"
        ]
      }
    }
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
