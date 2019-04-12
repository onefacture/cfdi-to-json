import servParConstDefinitionTemplate from "../servicio-parcial-construccion-definition";
describe("Servicio parcial construccion definition data test", () => {
  it("Execute without params", () => {
    expect(servParConstDefinitionTemplate()).toEqual({
      "servicioparcial:parcialesconstruccion": {
        position: "servicioParcial",
        attributes: ["version", "numPerLicoAut"],
        nodes: {
          "servicioparcial:Inmueble": {
            attributes: [
              "calle",
              "noExterior",
              "noInterior",
              "colonia",
              "localidad",
              "referencia",
              "municipio",
              "estado",
              "codigoPostal"
            ]
          }
        }
      }
    });
  });
  it("Execute with minimalData: False", () => {
    expect(servParConstDefinitionTemplate({ minimalData: false })).toEqual({
      "servicioparcial:parcialesconstruccion": {
        position: "servicioParcial",
        attributes: ["version", "numPerLicoAut"],
        nodes: {
          "servicioparcial:Inmueble": {
            attributes: [
              "calle",
              "noExterior",
              "noInterior",
              "colonia",
              "localidad",
              "referencia",
              "municipio",
              "estado",
              "codigoPostal"
            ]
          }
        }
      }
    });
  });
  it("Execute with minimalData: True", () => {
    expect(servParConstDefinitionTemplate({ minimalData: true })).toEqual({
      "servicioparcial:parcialesconstruccion": {
        position: "servicioParcial",
        attributes: ["version"]
      }
    });
  });
});
