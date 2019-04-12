import vehiculoUsadoTemplate from "../vehiculo-usado";
describe("Vehiculo usado data test", () => {
  it("Execute without params", () => {
    expect(vehiculoUsadoTemplate()).toEqual({
      "vehiculousado:VehiculoUsado": {
        position: "vehiculoUsado",
        attributes: [
          "version",
          "montoAdquisicion",
          "montoEnajenacion",
          "claveVehicular",
          "marca",
          "tipo",
          "modelo",
          "numeroMotor",
          "numeroSerie",
          "niv",
          "valor"
        ],
        nodes: {
          "vehiculousado:InformacionAduanera": {
            position: "informacionAduanera",
            attributes: ["numero", "fecha", "aduana"]
          }
        }
      }
    });
  });
  it("Execute with minimalData: False", () => {
    expect(vehiculoUsadoTemplate({ minimalData: false })).toEqual({
      "vehiculousado:VehiculoUsado": {
        position: "vehiculoUsado",
        attributes: [
          "version",
          "montoAdquisicion",
          "montoEnajenacion",
          "claveVehicular",
          "marca",
          "tipo",
          "modelo",
          "numeroMotor",
          "numeroSerie",
          "niv",
          "valor"
        ],
        nodes: {
          "vehiculousado:InformacionAduanera": {
            position: "informacionAduanera",
            attributes: ["numero", "fecha", "aduana"]
          }
        }
      }
    });
  });
  it("Execute with minimalData: True", () => {
    expect(vehiculoUsadoTemplate({ minimalData: true })).toEqual({
      "vehiculousado:VehiculoUsado": {
        position: "vehiculoUsado",
        attributes: ["version"]
      }
    });
  });
});
