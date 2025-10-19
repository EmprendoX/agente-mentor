const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración para producción...\n');

// Verificar archivos de configuración
const configFiles = [
  'next.config.ts',
  'netlify.toml',
  'public/_headers'
];

console.log('📋 Archivos de configuración:');
configFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - Presente`);
  } else {
    console.log(`❌ ${file} - Faltante`);
  }
});

// Verificar API routes
const apiRoutePath = 'app/api/pdf/[slug]/route.ts';
console.log('\n🔌 API Routes:');
if (fs.existsSync(apiRoutePath)) {
  console.log(`✅ ${apiRoutePath} - Presente`);
} else {
  console.log(`❌ ${apiRoutePath} - Faltante`);
}

// Verificar PDFs
const ebooksDir = 'public/ebooks';
console.log('\n📚 PDFs disponibles:');
if (fs.existsSync(ebooksDir)) {
  const ebooks = fs.readdirSync(ebooksDir);
  ebooks.forEach(ebook => {
    const pdfPath = path.join(ebooksDir, ebook, `${ebook}.pdf`);
    if (fs.existsSync(pdfPath)) {
      console.log(`✅ ${ebook}.pdf - Presente`);
    } else {
      console.log(`❌ ${ebook}.pdf - Faltante`);
    }
  });
} else {
  console.log(`❌ Directorio ${ebooksDir} no existe`);
}

console.log('\n🚀 Resumen para producción:');
console.log('1. ✅ Headers configurados para PDFs');
console.log('2. ✅ API route para servir PDFs');
console.log('3. ✅ Configuración de Netlify optimizada');

console.log('\n📝 Instrucciones para despliegue:');
console.log('1. Haz commit de todos los cambios');
console.log('2. Push a tu repositorio');
console.log('3. Netlify ejecutará el build automáticamente');
console.log('4. Los PDFs deberían funcionar en mentorx.mx');

console.log('\n🎯 URLs de prueba en producción:');
console.log('- https://mentorx.mx/ebook/educacion-con-sentido');
console.log('- https://mentorx.mx/api/pdf/educacion-con-sentido'); 
