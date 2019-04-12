import ventaVehiculosTemplate, {
  informacionAduaneraDefinition
} from "../conceptos.venta-vehiculos";
describe("Conceptos venta de vehiculos data test", () => {
  it("Execute without params", () => {
    expect(ventaVehiculosTemplate()).toEqual({
      "ventavehiculos:VentaVehiculos": {
        position: "ventaVehiculos",
        attributes: ["version", "claveVehicular", "niv"],
        nodes: Object.assign({}, informacionAduaneraDefinition, {
          "ventavehiculos:Parte": {
            strictArrayResponse: true,
            position: "partes",
            attributes: [
              "cantidad",
              "unidad",
              "noIdentificacion",
              "descripcion",
              "valorUnitario",
              "importe"
            ],
            nodes: informacionAduaneraDefinition
          }
        })
      }
    });
  });
  it("Execute with minimalData: false", () => {
    expect(ventaVehiculosTemplate({ minimalData: false })).toEqual({
      "ventavehiculos:VentaVehiculos": {
        position: "ventaVehiculos",
        attributes: ["version", "claveVehicular", "niv"],
        nodes: Object.assign({}, informacionAduaneraDefinition, {
          "ventavehiculos:Parte": {
            strictArrayResponse: true,
            position: "partes",
            attributes: [
              "cantidad",
              "unidad",
              "noIdentificacion",
              "descripcion",
              "valorUnitario",
              "importe"
            ],
            nodes: informacionAduaneraDefinition
          }
        })
      }
    });
  });
  it("Execute without params", () => {
    expect(ventaVehiculosTemplate({ minimalData: true })).toEqual({
      "ventavehiculos:VentaVehiculos": {
        position: "ventaVehiculos",
        attributes: ["version"]
      }
    });
  });
});
