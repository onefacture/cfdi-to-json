import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "obrasarte:obrasarteantiguedades": {
    position: "obrasarteAntiguedades",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "obrasarte:obrasarteantiguedades": {
    position: "obrasarteAntiguedades",
    attributes: [
      "version",
      "tipoBien",
      "otrosTipoBien",
      "tituloAdquirido",
      "otrosTituloAdquirido",
      "subTotal",
      "iva",
      "fechaAdquisicion",
      "caracteristicasDeObraoPieza"
    ]
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
