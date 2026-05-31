// Google Apps Script — pega este código en script.google.com
// Guarda automáticamente el progreso de cada estudiante en la hoja de cálculo

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Si la hoja está vacía, crea los encabezados
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Fecha', 'Nombre', 'Código', 'Módulo',
        'Total Preguntas', 'Correctas', 'Incorrectas', '% Acierto'
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold').setBackground('#4f8ef7').setFontColor('#ffffff');
    }

    sheet.appendRow([
      data.fecha,
      data.nombre,
      data.codigo,
      data.modulo,
      data.total_preguntas,
      data.correctas,
      data.incorrectas,
      data.porcentaje_acierto
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
