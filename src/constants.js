/* Initiative types */

export const PUNTO_DONACION = "PUNTO_DONACION";
export const OLLA = "OLLA";
export const MERIENDA = "MERIENDA";
export const CANASTA = "CANASTA";

/* Initiative display text */

export const DISPLAY_PUNTO_DONACION = "Punto de Donación";
export const DISPLAY_OLLA = "Olla";
export const DISPLAY_MERIENDA = "Merienda";
export const DISPLAY_CANASTA = "Canasta";

/* Google Sheets API config */
export const data_config = {
  apiKey: "AIzaSyC-kO_JEKMVnYNS7uGBHDMxh3sdykpIvzU",
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  spreadsheetId: "1o9oKU0ehVBzWlgcUZhxMDCi3FuCZIpq3RXtCozMJY6Q",
  range: "Iniciativas con datos obligatorios completos",
};

export const location_config = {
  apiKey: "AIzaSyC-kO_JEKMVnYNS7uGBHDMxh3sdykpIvzU",
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  spreadsheetId: "1o9oKU0ehVBzWlgcUZhxMDCi3FuCZIpq3RXtCozMJY6Q",
  range: "Barrios/Localidades",
};

export const categories = ["Olla", "Merienda", "Punto de Donación", "Canasta"];
