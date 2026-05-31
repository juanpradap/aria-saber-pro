# ARIA — Tutor Saber Pro
Agente de práctica para el examen Saber Pro · Administración de Empresas · UNIMINUTO

## Pasos para publicar (sin programar)

### PASO 1 — Obtener la API key gratuita de Gemini
1. Ve a https://aistudio.google.com/app/apikey
2. Inicia sesión con tu cuenta de Google
3. Haz clic en "Create API Key"
4. Copia esa clave (empieza por "AIza...")

### PASO 2 — Subir el código a GitHub
1. Ve a https://github.com y crea una cuenta gratuita
2. Haz clic en "New repository"
3. Nombre: aria-saber-pro
4. Selecciona "Public" y haz clic en "Create repository"
5. Haz clic en "uploading an existing file"
6. Sube todos los archivos de esta carpeta manteniendo la estructura:
   - vercel.json (en la raíz)
   - public/index.html
   - api/chat.js
   - api/guardar.js
7. Haz clic en "Commit changes"

### PASO 3 — Desplegar en Vercel
1. Ve a https://vercel.com y crea una cuenta con tu cuenta de GitHub
2. Haz clic en "Add New Project"
3. Selecciona el repositorio "aria-saber-pro"
4. Haz clic en "Deploy"
5. Espera 1-2 minutos hasta que aparezca la URL (ej: aria-saber-pro.vercel.app)

### PASO 4 — Agregar la API key en Vercel
1. En Vercel, ve a tu proyecto → Settings → Environment Variables
2. Agrega:
   - Name: GEMINI_API_KEY
   - Value: (pega tu clave de Gemini aquí)
3. Haz clic en "Save"
4. Ve a Deployments → haz clic en los 3 puntos → "Redeploy"

### PASO 5 — Configurar el registro en Google Sheets (opcional)
1. Ve a https://sheet.new y crea una hoja con estas columnas:
   Fecha | Nombre | Código | Módulo | Total Preguntas | Correctas | Incorrectas | % Acierto
2. Ve a https://script.google.com
3. Crea un nuevo script y pega el contenido del archivo google-script.js
4. Despliega como "Web App" → acceso "Anyone"
5. Copia la URL del Web App
6. En Vercel → Settings → Environment Variables agrega:
   - Name: GOOGLE_SHEETS_WEBHOOK
   - Value: (URL del Web App)
7. Haz Redeploy

### PASO 6 — Enlazar en Moodle
Copia la URL de tu app en Vercel (ej: https://aria-saber-pro.vercel.app)
y pégala en la actividad URL de tu curso de Moodle.

## Estructura del proyecto
aria-saber-pro/
├── vercel.json          ← configuración de despliegue
├── public/
│   └── index.html       ← la app completa (frontend)
└── api/
    ├── chat.js          ← conexión con Gemini AI
    └── guardar.js       ← registro de progreso
