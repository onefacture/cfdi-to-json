import timbreTemplate from "../timbre";
describe("Timbre data test", () => {
  it("Execute without params", () => {
    expect(timbreTemplate()).toEqual({
      "TimbreFiscalDigital": {
        position: "timbreFiscal",
        attributes: [
          "fechaTimbrado",
          "uuid",
          "noCertificadoSAT",
          "selloSAT",
          "selloCFD",
          "RFCProvCertif"
        ]
      }
    });
  });
  it("Execute with minimalData: False", () => {
    expect(timbreTemplate({ minimalData: false })).toEqual({
      "TimbreFiscalDigital": {
        position: "timbreFiscal",
        attributes: [
          "fechaTimbrado",
          "uuid",
          "noCertificadoSAT",
          "selloSAT",
          "selloCFD",
          "RFCProvCertif"
        ]
      }
    });
  });
  it("Execute with minimalData: True", () => {
    expect(timbreTemplate({ minimalData: true })).toEqual({
      "TimbreFiscalDigital": {
        position: "timbreFiscal",
        attributes: ["fechaTimbrado", "uuid"]
      }
    });
  });
});
