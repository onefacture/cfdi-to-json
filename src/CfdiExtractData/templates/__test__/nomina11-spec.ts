import nominaTemplate from "../nomina11";
describe("Nomina 11 data test", () => {
  it("Execute without params", () => {
    expect(nominaTemplate()).toEqual({
      "nomina:Nomina": {
        strictArrayResponse: true,
        position: "nominas",
        attributes: [
          "banco",
          "antiguedad",
          "numEmpleado",
          "tipoJornada",
          "tipoRegimen",
          "tipoContrato",
          "fechaInicioRelLaboral",
          "fechaInicialPago",
          "fechaFinalPago",
          "fechaPago",
          "curp",
          "version",
          "periodicidadPago",
          "tipoRegimen",
          "numSeguridadSocial",
          "registroPatronal",
          "puesto",
          "departamento",
          "salarioDiarioIntegrado",
          "salarioBaseCotApor"
        ],
        nodes: {
          "nomina:Percepciones": {
            position: "percepciones",
            attributes: ["totalGravado", "totalExento"],
            nodes: {
              "nomina:Percepcion": {
                attributes: [
                  "tipoPercepcion",
                  "clave",
                  "concepto",
                  "importeGravado",
                  "importeExento"
                ],
                strictArrayResponse: true,
                position: "arrayPercepciones"
              }
            }
          },
          "nomina:Deducciones": {
            position: "deducciones",
            attributes: ["totalGravado", "totalExento"],
            nodes: {
              "nomina:Deduccion": {
                attributes: [
                  "tipoDeduccion",
                  "clave",
                  "concepto",
                  "importeGravado",
                  "importeExento"
                ],
                strictArrayResponse: true,
                position: "arrayDeducciones"
              }
            }
          }
        }
      }
    });
  });
  it("Execute with minimalData: False", () => {
    expect(nominaTemplate({ minimalData: false })).toEqual({
      "nomina:Nomina": {
        strictArrayResponse: true,
        position: "nominas",
        attributes: [
          "banco",
          "antiguedad",
          "numEmpleado",
          "tipoJornada",
          "tipoRegimen",
          "tipoContrato",
          "fechaInicioRelLaboral",
          "fechaInicialPago",
          "fechaFinalPago",
          "fechaPago",
          "curp",
          "version",
          "periodicidadPago",
          "tipoRegimen",
          "numSeguridadSocial",
          "registroPatronal",
          "puesto",
          "departamento",
          "salarioDiarioIntegrado",
          "salarioBaseCotApor"
        ],
        nodes: {
          "nomina:Percepciones": {
            position: "percepciones",
            attributes: ["totalGravado", "totalExento"],
            nodes: {
              "nomina:Percepcion": {
                attributes: [
                  "tipoPercepcion",
                  "clave",
                  "concepto",
                  "importeGravado",
                  "importeExento"
                ],
                strictArrayResponse: true,
                position: "arrayPercepciones"
              }
            }
          },
          "nomina:Deducciones": {
            position: "deducciones",
            attributes: ["totalGravado", "totalExento"],
            nodes: {
              "nomina:Deduccion": {
                attributes: [
                  "tipoDeduccion",
                  "clave",
                  "concepto",
                  "importeGravado",
                  "importeExento"
                ],
                strictArrayResponse: true,
                position: "arrayDeducciones"
              }
            }
          }
        }
      }
    });
  });
  it("Execute with minimalData: True", () => {
    expect(nominaTemplate({ minimalData: true })).toEqual({
      "nomina:Nomina": {
        strictArrayResponse: true,
        position: "nominas",
        attributes: ["version"]
      }
    });
  });
});
