import cfdiRegistroFiscalTemplate from "../cfdi-registro-fiscal";
describe("Cfdi-registro-fical data test", () => {
  it("Execute without params", () => {
    expect(cfdiRegistroFiscalTemplate()).toEqual({
      "registrofiscal:CFDIRegistroFiscal": {
        position: "cfdiRegistroFiscal",
        attributes: ["version", "folio"]
      }
    });
  });

  it("Execute with minimalData:false", () => {
    expect(cfdiRegistroFiscalTemplate({ minimalData: false })).toEqual({
      "registrofiscal:CFDIRegistroFiscal": {
        position: "cfdiRegistroFiscal",
        attributes: ["version", "folio"]
      }
    });
  });

  it("execute with minimalData:true", () => {
    expect(cfdiRegistroFiscalTemplate({ minimalData: true })).toEqual({
      "registrofiscal:CFDIRegistroFiscal": {
        position: "cfdiRegistroFiscal",
        attributes: ["version"]
      }
    });
  });
});
