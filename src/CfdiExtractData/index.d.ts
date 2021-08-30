/// <reference types="cfdi" />

export interface NodoImpuestos {
    totalImpuestosRetenidos:   number;
    totalImpuestosTrasladados: number;
    traslados:                 Array<Impuesto>;
    retenciones:               Array<Impuesto>;
}

export interface tImpuesto {
    impuesto:    string;
    tipoFactor?: number;
    tasaOCuota?: number;
    importe:     any;
    tasa?:       number;
}

export interface tMinimalData {
	minimalData: Boolean;
}
