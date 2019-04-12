import turistaPasajeroExtrangeroTemplate from "../turista-pasajero-extranjero";
describe("Turista pasajero extrangero data test", () => {
  it("Execute without params", () => {
    expect(turistaPasajeroExtrangeroTemplate()).toEqual({
      "tpe:TuristaPasajeroExtranjero": {
        position: "turistaPasajeroExtranjero",
        attributes: ["version", "fechadeTransito", "tipoTransito"],
        nodes: {
          "tpe:datosTransito": {
            position: "datosTransito",
            attributes: [
              "via",
              "tipoId",
              "numeroId",
              "nacionalidad",
              "empresaTransporte",
              "idTransporte"
            ]
          }
        }
      }
    });
  });
  it("Execute with minimalData: False", () => {
    expect(turistaPasajeroExtrangeroTemplate({ minimalData: false })).toEqual({
      "tpe:TuristaPasajeroExtranjero": {
        position: "turistaPasajeroExtranjero",
        attributes: ["version", "fechadeTransito", "tipoTransito"],
        nodes: {
          "tpe:datosTransito": {
            position: "datosTransito",
            attributes: [
              "via",
              "tipoId",
              "numeroId",
              "nacionalidad",
              "empresaTransporte",
              "idTransporte"
            ]
          }
        }
      }
    });
  });
  it("Execute with minimalData: True", () => {
    expect(turistaPasajeroExtrangeroTemplate({ minimalData: true })).toEqual({
      "tpe:TuristaPasajeroExtranjero": {
        position: "turistaPasajeroExtranjero",
        attributes: ["version"]
      }
    });
  });
});
