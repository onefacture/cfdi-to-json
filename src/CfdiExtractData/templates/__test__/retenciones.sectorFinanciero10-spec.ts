import sectorFinanciero10Template from "../retenciones.sectorFinanciero10";
describe("Aerolineas data test", () => {
  it("Execute without params", () => {
    expect(sectorFinanciero10Template()).toEqual({
      "sectorfinanciero:SectorFinanciero": {
        position: "sectorFinanciero",
        attributes: [
          "version",
          "idFideicom",
          "nomFideicom",
          "descripFideicom",
        ]
      }
    });
  });

  it("Execute with minimalData true", () => {
    expect(
      sectorFinanciero10Template({
        minimalData: true
      })
    ).toEqual({
      "sectorfinanciero:SectorFinanciero": {
        position: "sectorFinanciero",
        attributes: ["version"]
      }
    });
  });

  it("Execute with minimalData false", () => {
    expect(
      sectorFinanciero10Template({
        minimalData: false
      })
    ).toEqual({
      "sectorfinanciero:SectorFinanciero": {
        position: "sectorFinanciero",
        attributes: [
          "version",
          "idFideicom",
          "nomFideicom",
          "descripFideicom",
        ]
      }
    });
  });
});
