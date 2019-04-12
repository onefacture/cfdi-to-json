import timbreTemplate from "../timbre";
describe("Timbre data test", () => {
  it("Execute without params", () => {
    expect(timbreTemplate()).toEqual({
      "tfd:TimbreFiscalDigital": {
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
      "tfd:TimbreFiscalDigital": {
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
      "tfd:TimbreFiscalDigital": {
        attributes: ["fechaTimbrado", "uuid"]
      }
    });
  });
});
