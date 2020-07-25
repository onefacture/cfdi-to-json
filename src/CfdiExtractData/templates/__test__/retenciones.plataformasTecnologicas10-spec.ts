import plataformasTemplate from "../retenciones.plataformasTecnologicas10";
describe("Aerolineas data test", () => {
  it("Execute without params", () => {
    expect(plataformasTemplate()).toEqual({
        "plataformasTecnologicas:ServiciosPlataformasTecnologicas": {
          "attributes": [
          "version",
          "periodicidad",
          "numServ",
          "monTotServSIVA",
          "totalIVATrasladado",
          "totalIVARetenido",
          "totalISRRetenido",
          "difIVAEntregadoPrestServ",
          "monTotalporUsoPlataforma",
          "MonTotalContribucionGubernamental",
          ],
        "nodes": {
            "plataformasTecnologicas:Servicios": {
              "strictArrayResponse": true,
              "nodes": {
              "plataformasTecnologicas:DetallesDelServicio": {
              "position": "detalles",
              "attributes": [
                "formaPagoServ",
                "tipoDeServ",
                "subTipServ",
                "RFCTerceroAutorizado",
                "fechaServ",
                "precioServSinIVA",
              ],
              "nodes": {
                "plataformasTecnologicas:ComisionDelServicio": {
                  "attributes": [
                    "base",
                    "porcentaje",
                    "importe",
                  ],
                  "position": "comisionesDelServicio",
                  "strictArrayResponse": true,
                },
                "plataformasTecnologicas:ContribucionGubernamental": {
                  "attributes": [
                    "impContrib",
                    "entidadDondePagaLaContribucion",
                  ],
                  "position": "contribucionesGubernamentales",
                  "strictArrayResponse": true,
                },
                "plataformasTecnologicas:ImpuestosTrasladadosdelServicio": {
                  "attributes": [
                    "base",
                    "impuesto",
                    "tipoFactor",
                    "tasaCuota",
                    "importe",
                  ],
                  "position": "traslados",
                  "strictArrayResponse": true,
                },
              },
              "strictArrayResponse": true,
              },
            },
            "position": "servicios",
          },
        },
        "position": "plataformasTecnologicas",
      },
    });
  });

  it("Execute with minimalData true", () => {
    expect(
      plataformasTemplate({
        minimalData: true
      })
    ).toEqual({
        "plataformasTecnologicas:ServiciosPlataformasTecnologicas": {
        "attributes": [
          "version",
        ],
        "position": "plataformasTecnologicas",
      },
    });
  });

  it("Execute with minimalData false", () => {
    expect(
      plataformasTemplate({
        minimalData: false
      })
    ).toEqual({
        "plataformasTecnologicas:ServiciosPlataformasTecnologicas": {
          "attributes": [
          "version",
          "periodicidad",
          "numServ",
          "monTotServSIVA",
          "totalIVATrasladado",
          "totalIVARetenido",
          "totalISRRetenido",
          "difIVAEntregadoPrestServ",
          "monTotalporUsoPlataforma",
          "MonTotalContribucionGubernamental",
          ],
        "nodes": {
            "plataformasTecnologicas:Servicios": {
              "strictArrayResponse": true,
              "nodes": {
              "plataformasTecnologicas:DetallesDelServicio": {
              "position": "detalles",
              "attributes": [
                "formaPagoServ",
                "tipoDeServ",
                "subTipServ",
                "RFCTerceroAutorizado",
                "fechaServ",
                "precioServSinIVA",
              ],
              "nodes": {
                "plataformasTecnologicas:ComisionDelServicio": {
                  "attributes": [
                    "base",
                    "porcentaje",
                    "importe",
                  ],
                  "position": "comisionesDelServicio",
                  "strictArrayResponse": true,
                },
                "plataformasTecnologicas:ContribucionGubernamental": {
                  "attributes": [
                    "impContrib",
                    "entidadDondePagaLaContribucion",
                  ],
                  "position": "contribucionesGubernamentales",
                  "strictArrayResponse": true,
                },
                "plataformasTecnologicas:ImpuestosTrasladadosdelServicio": {
                  "attributes": [
                    "base",
                    "impuesto",
                    "tipoFactor",
                    "tasaCuota",
                    "importe",
                  ],
                  "position": "traslados",
                  "strictArrayResponse": true,
                },
              },
              "strictArrayResponse": true,
              },
            },
            "position": "servicios",
          },
        },
        "position": "plataformasTecnologicas",
      },
    });
  });
});
