export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY no encontrada en variables de entorno' });

  const { historial } = req.body || {};
  if (!historial) return res.status(400).json({ error: 'Falta el historial' });

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: historial,
        generationConfig: { temperature: 0.7, maxOutputTokens: 1200 }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(500).json({ error: `Gemini error ${response.status}: ${JSON.stringify(data.error)}` });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return res.status(500).json({ error: 'Respuesta vacía: ' + JSON.stringify(data).slice(0,200) });

    return res.status(200).json({ text });

  } catch (err) {
    return res.status(500).json({ error: 'Error: ' + err.message });
  }
}
