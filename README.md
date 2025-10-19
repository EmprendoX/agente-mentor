# 🚀 Agente Mentor OS — Ecosistema de agentes IA para equipos en expansión

Agente Mentor OS es una plataforma que orquesta suites de agentes de inteligencia artificial para acompañar a emprendedores, startups y organizaciones en crecimiento. Cada agente combina contexto de negocio, automatizaciones y recursos accionables para lanzar, vender, operar y aprender a ritmo acelerado.

## 🌌 Visión
Construir el ecosistema líder de agentes IA en español que acompaña a equipos Latinoamericanos desde la ideación hasta la expansión global, integrando estrategia, ejecución y aprendizaje continuo en una misma experiencia.

## 🎯 Objetivos estratégicos
1. **Orquestar lanzamientos y experimentos continuos:** ciclos de innovación más cortos, decisiones respaldadas por datos y retroalimentación constante.
2. **Escalar ventas consultivas basadas en insights en tiempo real:** funnel activo, pipeline priorizado por impacto y mensajes personalizados por industria.
3. **Diseñar experiencias memorables para clientes y equipos:** onboarding, comunidades y contenidos que refuerzan una marca humana apoyada por IA.

## 👥 Público objetivo
- Founders y equipos directivos de startups o scaleups en etapa de expansión.
- Líderes de innovación corporativa que necesitan pilotos medibles y de rápida iteración.
- Consultoras, aceleradoras y hubs que buscan experiencias premium para sus comunidades.

## 💡 Propuesta de valor
- **Agentes coreografiados:** cinco roles principales que trabajan sincronizados (Estratega, Arquitecto de Operaciones, Catalizador Comercial, Diseñador de Experiencias y Radar de Insights).
- **Implementaciones guiadas:** activaciones en menos de 30 días con plantillas accionables conectadas a datos reales.
- **Aprendizaje continuo:** documentación pública, recursos dinámicos y retroalimentación omnicanal para cada interacción.

## 🧩 Suites de agentes
| Color | Rol | Impacto clave |
| --- | --- | --- |
| Azul | Estratega de Crecimiento | Define visión, posicionamiento y roadmaps OKR. |
| Verde | Arquitecto de Operaciones | Automatiza procesos y coordina flujos críticos. |
| Naranja | Catalizador Comercial | Activa funnels, contenido y revenue predecible. |
| Morado | Diseñador de Experiencias | Personaliza onboarding, cohortes y comunidades. |
| Amarillo | Radar de Insights | Analiza señales, detecta riesgos y narra métricas clave. |

## 🛠️ Tecnologías utilizadas
- **Framework:** Next.js 15, React 18, TypeScript.
- **UI & estilos:** Tailwind CSS con paleta multiagente (azul, verde, naranja, morado, amarillo).
- **Iconografía:** Lucide React.
- **Deployment recomendado:** Netlify (`www.mentorx.mx`).

## 🚀 Instalación y desarrollo
1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/EmprendoX/agente-mentor.git
   cd agente-mentor
   ```
2. **Instalar dependencias**
   ```bash
   npm install
   ```
3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```
4. **Abrir en el navegador** → [http://localhost:3000](http://localhost:3000)

## 📁 Estructura principal
```
agente-mentor/
├── app/
│   ├── layout.tsx            # Layout global con nueva identidad visual
│   ├── page.tsx              # Landing de visión y suites de agentes
│   ├── sidebar.tsx           # Navegación multiagente
│   ├── globals.css           # Estilos globales y variables de color
│   └── ...
├── public/                   # Recursos estáticos (portadas, PDFs)
├── README.md                 # Documentación pública
└── RESUMEN_IMPLEMENTACION.md # Resumen operativo de la entrega
```

## 📘 Documentación clave
- `RESUMEN_IMPLEMENTACION.md`: hitos técnicos, configuraciones y próximos pasos.
- `SISTEMA_PAGINAS_INDEPENDIENTES.md`: arquitectura para páginas individuales de eBooks.
- `INSTRUCCIONES_*`: instrucciones específicas por plantilla.

## 🎨 Experiencia y diseño
- Fondo dinámico con gradientes multiagente (azul, verde, naranja, morado y amarillo).
- Componentes con capas de cristal y sombras para comunicar tecnología premium.
- Tipografía orientada a claridad con énfasis en datos accionables y storytelling.

## 🔧 Scripts disponibles
```bash
npm run dev      # Desarrollo local
npm run build    # Construcción para producción
npm run start    # Servidor de producción
npm run lint     # Verificación de código
```

## 🌐 Despliegue en Netlify (recomendado)
1. Conectar la cuenta de GitHub y seleccionar el repositorio `agente-mentor` en Netlify.
2. Establecer como comando de build `npm run build` y directorio publicado `.next` (Netlify lo detecta automáticamente con el plugin oficial).
3. (Opcional) Variables de entorno:
   ```env
   NEXT_PUBLIC_SITE_URL=https://www.mentorx.mx
   ```
4. Configurar dominio personalizado en GoDaddy apuntando a Netlify:
   - **CNAME** (`www`) → `agente-mentor.netlify.app`
   - **A** (root opcional) → valores proporcionados por Netlify DNS

## 📱 Responsive
La interfaz está optimizada para móviles (≥320px), tablets, desktop y pantallas grandes (≥1440px) manteniendo consistencia visual y jerarquía de información.
