# 🚀 Agente Mentor - Plataforma de eBooks con IA

Una plataforma moderna de eBooks especializados con mentoría integrada por inteligencia artificial, diseñada para profesionales y emprendedores.

## ✨ Características Principales

- 📚 **Biblioteca de eBooks Especializados**: Acceso a contenido premium en diversas áreas profesionales
- 🤖 **Mentoría con IA**: Agentes inteligentes que responden dudas y guían el aprendizaje
- 📝 **Sistema de Notas Integrado**: Organiza y guarda tus aprendizajes
- 📊 **Reportes Personalizados**: Seguimiento de tu progreso y métricas
- 📅 **Calendario de Actividades**: Planifica y organiza tu tiempo de estudio
- 🔄 **Automatizaciones**: Flujos de trabajo automatizados para mayor productividad
- 👥 **Panel de Administración**: Gestión completa de usuarios y contenido

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Iconos**: Lucide React
- **Deployment**: Vercel
- **Dominio**: www.mentorx.mx

## 🚀 Instalación y Desarrollo

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Instalación

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

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📁 Estructura del Proyecto

```
agente-mentor/
├── app/                    # App Router de Next.js 15
│   ├── admin/             # Panel de administración
│   ├── agentes/           # Agentes de IA
│   ├── automatizaciones/  # Centro de automatizaciones
│   ├── calendario/        # Calendario de actividades
│   ├── comunicaciones/    # Sistema de comunicaciones
│   ├── documentos/        # Gestión de documentos
│   ├── ebook/             # Páginas individuales de eBooks
│   ├── ebooks/            # Listado de eBooks
│   ├── mentor/            # Guía del mentor
│   ├── registro/          # Página de registro
│   ├── reportes/          # Reportes y métricas
│   └── tareas/            # Gestión de tareas
├── public/                # Archivos estáticos
│   └── ebooks/           # PDFs y recursos de eBooks
├── components/            # Componentes reutilizables
└── globals.css           # Estilos globales
```

## 🎨 Páginas Principales

### 🏠 Página Principal (`/`)
- Landing page con información de la plataforma
- Navegación a todas las secciones
- Formulario de registro integrado

### 📚 eBooks (`/ebooks`)
- Catálogo completo de eBooks disponibles
- Filtros por categoría y tema
- Información detallada de cada eBook

### 📖 eBook Individual (`/ebook/[slug]`)
- Visualizador de PDF integrado
- Sistema de notas personal
- Chat con IA para dudas específicas
- Navegación por capítulos

### 🤖 Agentes (`/agentes`)
- **Automatizador**: Configuración de flujos automáticos
- **WebSearch**: Búsqueda inteligente en la web
- Integración con diferentes fuentes de datos

### 📊 Reportes (`/reportes`)
- Métricas de progreso
- Análisis de tiempo de estudio
- Reportes personalizados por usuario

### 📅 Calendario (`/calendario`)
- Planificación de sesiones de estudio
- Recordatorios automáticos
- Integración con eventos de la plataforma

### 👨‍💼 Admin (`/admin`)
- Gestión de usuarios
- Asignación de agentes y herramientas
- Control de accesos y permisos

## 🌐 Despliegue

### Vercel (Recomendado)

1. **Conectar con GitHub**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu cuenta de GitHub
   - Importa el repositorio `agente-mentor`

2. **Configurar dominio personalizado**
   - En la configuración del proyecto en Vercel
   - Agrega `www.mentorx.mx` como dominio personalizado
   - Configura los registros DNS en GoDaddy

3. **Variables de entorno** (si es necesario)
   ```env
   NEXT_PUBLIC_SITE_URL=https://www.mentorx.mx
   ```

### Configuración DNS en GoDaddy

```
Tipo: A
Nombre: @
Valor: 76.76.19.19

Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
```

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo local
npm run build        # Construcción para producción
npm run start        # Servidor de producción
npm run lint         # Verificación de código
```

## 📱 Responsive Design

La plataforma está completamente optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Pantallas grandes (1440px+)

## 🎯 Características de UX/UI

- **Diseño Moderno**: Interfaz limpia y profesional
- **Navegación Intuitiva**: Sidebar con acceso rápido a todas las secciones
- **Feedback Visual**: Estados de carga, éxito y error claros
- **Accesibilidad**: Cumple con estándares WCAG
- **Performance**: Optimizado para velocidad de carga

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Desarrollador**: Agustín Pascal Sierra
- **GitHub**: [@EmprendoX](https://github.com/EmprendoX)
- **Sitio Web**: [www.mentorx.mx](https://www.mentorx.mx)

## 🙏 Agradecimientos

- Next.js por el framework increíble
- Vercel por el hosting y deployment
- Tailwind CSS por el sistema de diseño
- Lucide por los iconos hermosos

---

**¡Construido con ❤️ para la comunidad de emprendedores!**
# Force deploy
Force Vercel redeploy Tue Jul  1 13:39:45 CST 2025
