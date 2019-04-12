import institucionesEducativasPrivadasTemplate from "../conceptos.instituciones-educativas-privadas";
describe("Conceptos de instituciones educativas privadas data test", () => {
  it("Execute with minimal data", () => {
    expect(institucionesEducativasPrivadasTemplate()).toEqual({
      "iedu:instEducativas": {
        position: "instEducativa",
        attributes: [
          "version",
          "nombreAlumno",
          "curp",
          "nivelEducativo",
          "autRVOE",
          "rfcPago"
        ]
      }
    });
  });
});
