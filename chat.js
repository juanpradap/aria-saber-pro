export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const { historial, nombre, modulo } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) return res.status(500).json({ error: 'API key no configurada. Ve a Vercel → Settings → Environment Variables y agrega GEMINI_API_KEY.' });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: historial,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1200,
            topP: 0.9
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error('Gemini error:', data);
      return res.status(500).json({ error: data.error?.message || 'Error de Gemini API' });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return res.status(500).json({ error: 'Respuesta vacía de Gemini' });

    return res.status(200).json({ text });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Error interno del servidor: ' + err.message });
  }
}
