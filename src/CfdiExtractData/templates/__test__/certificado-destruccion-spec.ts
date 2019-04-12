import certificadoDestruccionTemplate from "../certificado-destruccion";
describe("Certificado_destruccion data test", () => {
  it("Execute with minimal", () => {
    expect(certificadoDestruccionTemplate()).toEqual({
      "destruccion:certificadodedestruccion": {
        position: "certificadoDestruccion",
        attributes: ["version", "serie", "numFolDesVeh"]
      }
    });
  });
});
