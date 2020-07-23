import { tMinimalData } from "../index.d";

export const minimalDataDefinition = {
  "notariospublicos:NotariosPublicos": {
    position: "notariosPublicos",
    attributes: ["version"]
  }
};

export const allDataDefinition = {
  "notariospublicos:NotariosPublicos": {
    position: "notariosPublicos",
    attributes: ["version"],
    nodes: {
      "notariospublicos:DescInmuebles": {
        nodes: {
          "notariospublicos:DescInmueble": {
            strictArrayResponse: true,
            position: "descInmuebles",
            attributes: [
              "tipoInmueble",
              "calle",
              "noExterior",
              "noInterior",
              "colonia",
              "localidad",
              "referencia",
              "municipio",
              "estado",
              "pais",
              "codigoPostal"
            ]
          }
        }
      },
      "notariospublicos:DatosOperacion": {
        position: "datosOperacion",
        attributes: [
          "numInstrumentoNotarial",
          "fechaInstNotarial",
          "montoOperacion",
          "subTotal",
          "IVA"
        ]
      },
      "notariospublicos:DatosNotario": {
        position: "datosNotario",
        attributes: ["curp", "numNotaria", "entidadFederativa", "adscripcion"]
      },
      "notariospublicos:DatosEnajenante": {
        position: "datosEnajenante",
        attributes: ["coproSocConyugalE"],
        nodes: {
          "notariospublicos:DatosUnEnajenante": {
            position: "datosUnEnajenante",
            attributes: [
              "nombre",
              "apellidoPaterno",
              "apellidoMaterno",
              "rfc",
              "curp"
            ]
          },
          "notariospublicos:DatosEnajenantesCopSC": {
            nodes: {
              "notariospublicos:DatosEnajenanteCopSC": {
                strictArrayResponse: true,
                position: "datosEnajenanteCopSC",
                attributes: [
                  "nombre",
                  "apellidoPaterno",
                  "apellidoMaterno",
                  "rfc",
                  "porcentaje"
                ]
              }
            }
          }
        }
      },
      "notariospublicos:DatosAdquiriente": {
        position: "datosAdquiriente",
        attributes: ["coproSocConyugalE"],
        nodes: {
          "notariospublicos:DatosUnAdquiriente": {
            position: "datosUnAdquiriente",
            attributes: [
              "nombre",
              "apellidoPaterno",
              "apellidoMaterno",
              "rfc",
              "curp"
            ]
          },
          "notariospublicos:DatosAdquirientesCopSC": {
            nodes: {
              "notariospublicos:DatosAdquirienteCopSC": {
                strictArrayResponse: true,
                position: "datosAdquirientesCopSC",
                attributes: [
                  "nombre",
                  "apellidoPaterno",
                  "apellidoMaterno",
                  "rfc",
                  "porcentaje"
                ]
              }
            }
          }
        }
      }
    }
  }
};

export default (params?: tMinimalData) =>
  params && params.minimalData
  ? minimalDataDefinition
  : allDataDefinition;
