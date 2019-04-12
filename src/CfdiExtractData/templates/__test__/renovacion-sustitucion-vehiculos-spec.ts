import renovacionSustVehiculosTemplate from "../renovacion-sustitucion-vehiculos";
describe("Renovacion, sustitucion de vehiculos data test", () => {
  it("Execute without params", () => {
    expect(renovacionSustVehiculosTemplate()).toEqual({
      "decreto:renovacionysustitucionvehiculos": {
        position: "renovacionSustitucionVehiculos",
        attributes: ["version", "tipoDeDecreto"]
      }
    });
  });
  it("Execute with minimalData: False", () => {
    expect(renovacionSustVehiculosTemplate({ minimalData: false })).toEqual({
      "decreto:renovacionysustitucionvehiculos": {
        position: "renovacionSustitucionVehiculos",
        attributes: ["version", "tipoDeDecreto"]
      }
    });
  });
  it("Execute with minimalData: True", () => {
    expect(renovacionSustVehiculosTemplate({ minimalData: true })).toEqual({
      "decreto:renovacionysustitucionvehiculos": {
        position: "renovacionSustitucionVehiculos",
        attributes: ["version"]
      }
    });
  });
});
