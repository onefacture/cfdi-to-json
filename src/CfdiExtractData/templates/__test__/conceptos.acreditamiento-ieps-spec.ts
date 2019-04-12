import conceptosAcreditamientoIeps from "../conceptos.acreditamiento-ieps";
describe("Conceptos acred ieps data test", () => {
  it("Execute with minimalData", () => {
    expect(conceptosAcreditamientoIeps()).toEqual({
      "aieps:acreditamientoIEPS": {
        postion: "acreditamientoIEPS",
        attributes: ["version", "tar"]
      }
    });
  });
});
