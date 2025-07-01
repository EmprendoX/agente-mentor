# Guía de Despliegue - Agente Mentor

## Configuración para PDFs en Producción

### 1. Verificación de Archivos

Antes del despliegue, ejecuta el script de verificación:

```bash
npm run check-pdfs
```

Esto verificará que todos los PDFs y imágenes de portada estén presentes en la carpeta `public/ebooks/`.

### 2. Configuración de Vercel

El proyecto está configurado con:

- **Headers específicos para PDFs**: `X-Frame-Options: SAMEORIGIN` y `Content-Security-Policy: frame-ancestors 'self'`
- **Cache optimizado**: Los PDFs se cachean por 1 año
- **Content-Type correcto**: `application/pdf` para archivos PDF

### 3. Archivos de Configuración

#### `next.config.ts`
- Headers de seguridad para PDFs
- Configuración de webpack para archivos PDF
- Optimizaciones de producción

#### `vercel.json`
- Rutas específicas para `/ebooks/*`
- Headers de seguridad
- Rewrites para archivos estáticos

#### `public/_headers`
- Headers adicionales para Vercel
- Configuración de cache para archivos estáticos

### 4. Componente PDFViewer

El nuevo componente `PDFViewer` incluye:

- ✅ Verificación de disponibilidad del PDF
- ✅ Estados de carga y error
- ✅ Fallbacks para dispositivos móviles
- ✅ Opciones de descarga y apertura en nueva pestaña
- ✅ Manejo robusto de errores

### 5. Despliegue

```bash
# Verificar archivos
npm run check-pdfs

# Build de producción
npm run build

# Desplegar en Vercel
vercel --prod
```

### 6. Verificación Post-Despliegue

1. **Verificar PDFs**: Navega a cada eBook y confirma que los PDFs se cargan
2. **Verificar Headers**: Usa las herramientas de desarrollador para confirmar que los headers están configurados correctamente
3. **Verificar Móvil**: Prueba en dispositivos móviles

### 7. Troubleshooting

#### PDF no se muestra
- Verificar que el archivo existe en `public/ebooks/`
- Verificar headers de seguridad
- Usar "Abrir en Nueva Pestaña" como fallback

#### Error de CORS
- Los headers `X-Frame-Options` y `Content-Security-Policy` están configurados
- Verificar configuración de Vercel

#### Problemas de Cache
- Los archivos tienen cache de 1 año
- Para forzar actualización, cambiar el nombre del archivo

### 8. Estructura de Archivos

```
public/
├── ebooks/
│   ├── educacion-con-sentido/
│   │   ├── educacion-con-sentido.pdf
│   │   └── portada.png
│   ├── como-hacer-que-extranos-compren-tu-propiedad/
│   │   ├── como-hacer-que-extranos-compren-tu-propiedad.pdf
│   │   └── como-hacer-que-extranos-compren-tu-propiedad.png
│   └── ...
└── _headers
```

### 9. Monitoreo

- Usar Vercel Analytics para monitorear errores
- Verificar logs de Vercel para problemas de carga
- Monitorear métricas de rendimiento de PDFs

### 10. Actualizaciones

Para actualizar PDFs:

1. Reemplazar archivo en `public/ebooks/`
2. Cambiar nombre del archivo para evitar cache
3. Actualizar configuración en `app/ebook/[slug]/page.tsx` si es necesario
4. Redesplegar

---

**Nota**: Esta configuración está optimizada para Vercel. Para otros proveedores, ajustar la configuración según sea necesario. 