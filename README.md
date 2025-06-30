# Agente Mentor - Plataforma de eBooks con Mentoría Integrada

## 📚 Descripción

Agente Mentor es una plataforma moderna desarrollada en Next.js que ofrece una experiencia completa de lectura de eBooks con herramientas integradas de mentoría, toma de notas y generación de reportes personalizados.

## 🎯 Características Principales

### 📖 Sistema Multi-eBook
- **Selector de eBooks**: Interfaz intuitiva para cambiar entre diferentes eBooks
- **Carga automática**: Los PDFs se cargan automáticamente desde el servidor
- **Visor integrado**: Visualización nativa de PDFs con controles de redimensionamiento
- **Descarga directa**: Botón para descargar los eBooks en formato PDF

### 💬 Chat con Mentor Especializado
- **Mentoría personalizada**: Cada eBook tiene su propio mentor especializado
- **Integración con webhook**: Conexión con sistema de IA para respuestas inteligentes
- **Contexto específico**: El mentor conoce el contenido del eBook seleccionado
- **Chat en tiempo real**: Interacción fluida con el mentor

### 📝 Sistema de Notas OneNote-Style
- **Organización jerárquica**: Notebooks → Secciones → Páginas
- **Editor rico**: Formato de texto, listas, enlaces
- **Persistencia local**: Las notas se guardan automáticamente
- **Interfaz intuitiva**: Diseño similar a Microsoft OneNote

### 📊 Generador de Reportes Personalizados
- **Campos dinámicos**: Se adaptan según el tipo de eBook
- **Análisis específico**: Recomendaciones basadas en el contenido del eBook
- **Formularios inteligentes**: Campos relevantes para cada categoría

### 🔧 Dashboard Administrativo
- **Gestión de usuarios**: Panel de control para administradores
- **Monitoreo de actividad**: Seguimiento de interacciones
- **Acceso en `/admin`**: Interfaz administrativa separada

## 📚 eBooks Disponibles

### 1. Educación con Sentido
- **Categoría**: Educación
- **Especialización del mentor**: Educación con Sentido
- **Campos del reporte**: Industria, nicho, ubicación, tipo de producto
- **Archivos**: 
  - PDF: `/ebooks/educacion-con-sentido/educacion-con-sentido.pdf`
  - Portada: `/ebooks/educacion-con-sentido/portada.png`

### 2. Como hacer que extraños compren tu propiedad
- **Categoría**: Inmobiliaria
- **Especialización del mentor**: Venta de Propiedades
- **Campos del reporte**: Tipo de propiedad, ubicación, condiciones del mercado, comprador objetivo
- **Archivos**:
  - PDF: `/ebooks/como-hacer-que-extraños-compren-tu-propiedad/como-hacer-que-extraños-compren-tu-propiedad.pdf`
  - Portada: `/ebooks/como-hacer-que-extraños-compren-tu-propiedad/como-hacer-que-extraños-compren-tu-propiedad.png`

## 🚀 Instalación y Uso

### Requisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]
cd agente-mentor

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### Acceso
- **Plataforma principal**: http://localhost:3000
- **Dashboard admin**: http://localhost:3000/admin

## 🏗️ Arquitectura Técnica

### Frontend
- **Framework**: Next.js 15.3.4 con App Router
- **Estilos**: Tailwind CSS
- **Estado**: React Hooks
- **Componentes**: TypeScript

### Características Técnicas
- **Visor de PDF**: iframe nativo del navegador
- **Chat**: Integración con webhook externo
- **Notas**: Almacenamiento local con localStorage
- **Responsive**: Diseño adaptativo para móviles y desktop

### Estructura de Archivos
```
agente-mentor/
├── app/
│   ├── components/
│   │   └── NotesSystem.tsx
│   ├── admin/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── sidebar.tsx
├── public/
│   └── ebooks/
│       ├── educacion-con-sentido/
│       │   ├── educacion-con-sentido.pdf
│       │   └── portada.png
│       └── como-hacer-que-extraños-compren-tu-propiedad/
│           ├── como-hacer-que-extraños-compren-tu-propiedad.pdf
│           └── como-hacer-que-extraños-compren-tu-propiedad.png
└── template-config.json
```

## 🔧 Configuración

### Agregar Nuevos eBooks
1. Crear carpeta en `public/ebooks/[nombre-del-ebook]/`
2. Agregar archivos PDF y PNG de portada
3. Actualizar la configuración en `app/page.tsx` (objeto `EBOOKS`)
4. Crear archivo de configuración específico si es necesario

### Configuración del Mentor
- **Webhook URL**: Configurado en el código para cada eBook
- **Especialización**: Definida por eBook en la configuración
- **Contexto**: Se envía automáticamente con cada mensaje

## 📊 Métricas y Seguimiento

### KPIs Recomendados
- Tiempo de lectura por eBook
- Número de notas creadas
- Consultas al mentor por categoría
- Reportes generados por tipo
- Tasa de finalización de contenido

## 🔄 Mantenimiento

### Actualizaciones Regulares
- Revisar y actualizar contenido de eBooks
- Ajustar respuestas del mentor
- Optimizar campos de reportes
- Verificar accesibilidad de archivos

### Backup
- Mantener copias de seguridad de archivos PDF
- Exportar configuraciones de eBooks
- Respaldo de datos de usuarios (si se implementa)

## 📞 Soporte

Para consultas técnicas o de contenido, contactar al equipo de desarrollo.

---

**Versión**: 2.0.0  
**Última actualización**: 2024-06-28  
**Estado**: ✅ Producción lista

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
