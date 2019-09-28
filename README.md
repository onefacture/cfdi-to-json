# CFDI to JSON

Este módulo soporta las versiónes 3.2 y 3.3 con los siguientes complementos del SAT.

- Timbre fiscal
- Pagos
- Impuestos Locales
- Nominas 1.1 y 1.2
- Estado cuenta combustible 1.0, 1.1 y 1.2
- Donatarias
- Divisas
- Leyendas fiscales
- PFintegrante coordinado
- Turista pasajero extranjero
- Spei
- Detallista
- Cfdi registro fiscal
- Pago en especie
- Vales de despensa
- Consumo de combustibles 1.0 y 1.1
- Aerolineas
- Notarios
- Vehiculos usados
- Servicio parcial construccion
- Renovacion sustitucion vehiculos
- Certificado destrucción
- Obras arte antiguedades
- ComercioExterior 1.1 y 1.1
- Ine


### Instalación

```
npm i --save cfdi-to-json
```

### Uso

```Javascript
const CfdiToJson = require('cfdi-to-json');
var jsonCfdi = null;

// Uso con ruta del XML
jsonCfdi = CfdiToJson.parse({ path: 'RUTA_DEL_CFDI.xml' });

// Uso con el contenido del XML
jsonCfdi = CfdiToJson.parse({
	contentXML: `
		<?xml version="1.0" encoding="utf-8"?>
		<cfdi:Comprobante Version="3.3" ...>
			...
		</cfdi:Comprobante>
	`
});

```

### Estructura de datos
Este es un ejemplo de como vendría formateado el JSON resultado. Puedes probar con CFDIs complejos para ver como se formatean en tu caso.

```
{
	version: String,
	serie: String,
	sello: String,
	folio: String,
	fecha: String,
	formaDePago: String,
	metodoDePago: String,
	subTotal: String,
	total: String,
	certificado: String,
	noCertificado: String,
	tipoDeComprobante: String,
	moneda: String,
	tipoCambio: String,
	descuento: String,
	motivoDescuento: String,
	lugarExpedicion: String,
	numCtaPago: String,
	emisor: Object<{
		nombre: String,
		rfc: String,
		regimenFiscal: String
	}>,
	receptor: Object<{
		nombre: String,
		rfc: String,
		residenciaFiscal: String,
		numRegIdTrib: String,
		usoCFDI: String
	}>,
	conceptos: Array<{
		claveProdServ: String,
		noIdentificacion: String,
		cantidad: String,
		claveUnidad: String,
		unidad: String,
		descripcion: String,
		valorUnitario: String,
		importe: String,
		descuento: String
	}>
	impuestos: Object<{
		totalImpuestosRetenidos: String,
		totalImpuestosTrasladados: String,
		traslados: Array<{ ... }>,
		retenciones: Array<{ ... }>
	}>,
	...
}
```

### Licencia

MIT

