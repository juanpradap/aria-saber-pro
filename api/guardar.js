export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK;

  // Si no hay webhook configurado, retorna OK silenciosamente
  if (!webhookUrl) return res.status(200).json({ ok: true, msg: 'Webhook no configurado, progreso no guardado' });

  const { nombre, codigo, modulo, respuesta, correctas, incorrectas, total, fecha } = req.body;

  const porcentaje = total > 0 ? Math.round((correctas / total) * 100) : 0;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fecha,
        nombre,
        codigo,
        modulo,
        total_preguntas: total,
        correctas,
        incorrectas,
        porcentaje_acierto: porcentaje + '%'
      })
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error guardando progreso:', err);
    return res.status(200).json({ ok: false, msg: 'Error al guardar, pero sesión continúa' });
  }
}
