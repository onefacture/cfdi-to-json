import pfIntegranteCoordinadoTemplate from "../pf-integrante-coordinado";
describe("Pf integrante coordinado data test", () => {
  it("Execute without params", () => {
    expect(pfIntegranteCoordinadoTemplate()).toEqual({
      "pfic:PFintegranteCoordinado": {
        position: "pfIntegranteCoordinado",
        attributes: ["version", "claveVehicular", "placa", "RFCPF"]
      }
    });
  });
  it("Execute with minimalData: False", () => {
    expect(pfIntegranteCoordinadoTemplate({ minimalData: false })).toEqual({
      "pfic:PFintegranteCoordinado": {
        position: "pfIntegranteCoordinado",
        attributes: ["version", "claveVehicular", "placa", "RFCPF"]
      }
    });
  });
  it("Execute with minimalData: True", () => {
    expect(pfIntegranteCoordinadoTemplate({ minimalData: true })).toEqual({
      "pfic:PFintegranteCoordinado": {
        position: "pfIntegranteCoordinado",
        attributes: ["version"]
      }
    });
  });
});
