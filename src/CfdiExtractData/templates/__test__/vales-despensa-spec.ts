import valesDespensaTemplate from "../vales-despensa";
describe("Vales de despensa data test", () => {
  it("Execute without params", () => {
    expect(valesDespensaTemplate()).toEqual({
      "valesdedespensa:ValesDeDespensa": {
        position: "valesDeDespensa",
        attributes: [
          "version",
          "tipoOperacion",
          "registroPatronal",
          "numeroDeCuenta",
          "total"
        ],
        nodes: {
          "valesdedespensa:Conceptos": {
            nodes: {
              "valesdedespensa:Concepto": {
                strictArrayResponse: true,
                position: "conceptos",
                attributes: [
                  "identificador",
                  "fecha",
                  "rfc",
                  "curp",
                  "nombre",
                  "numSeguridadSocial",
                  "importe"
                ]
              }
            }
          }
        }
      }
    });
  });
  it("Execute with minimalData: False", () => {
    expect(valesDespensaTemplate({ minimalData: false })).toEqual({
      "valesdedespensa:ValesDeDespensa": {
        position: "valesDeDespensa",
        attributes: [
          "version",
          "tipoOperacion",
          "registroPatronal",
          "numeroDeCuenta",
          "total"
        ],
        nodes: {
          "valesdedespensa:Conceptos": {
            nodes: {
              "valesdedespensa:Concepto": {
                strictArrayResponse: true,
                position: "conceptos",
                attributes: [
                  "identificador",
                  "fecha",
                  "rfc",
                  "curp",
                  "nombre",
                  "numSeguridadSocial",
                  "importe"
                ]
              }
            }
          }
        }
      }
    });
  });
  it("Execute with minimalData: True", () => {
    expect(valesDespensaTemplate({ minimalData: true })).toEqual({
      "valesdedespensa:ValesDeDespensa": {
        position: "valesDeDespensa",
        attributes: ["version"]
      }
    });
  });
});
