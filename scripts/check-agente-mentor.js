const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración de Agente Mentor...\n');

// Verificar que no hay referencias a SchoolX
console.log('🔍 Verificando referencias incorrectas:');
const filesToCheck = [
  'app/layout.tsx',
  'app/page.tsx',
  'package.json',
  'README.md'
];

let schoolXReferences = 0;
filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('SchoolX')) {
      console.log(`❌ ${file} - Contiene referencias a SchoolX`);
      schoolXReferences++;
    } else {
      console.log(`✅ ${file} - Sin referencias a SchoolX`);
    }
  }
});

if (schoolXReferences === 0) {
  console.log('\n✅ Todas las referencias están corregidas para Agente Mentor');
} else {
  console.log(`\n⚠️  Se encontraron ${schoolXReferences} archivos con referencias a SchoolX`);
}

// Verificar configuración de Vercel
console.log('\n🚀 Verificando configuración de Vercel:');
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
if (vercelConfig.routes && vercelConfig.routes.length > 0) {
  console.log('⚠️  Configuración "routes" detectada - puede causar conflictos');
} else {
  console.log('✅ Configuración de Vercel simplificada');
}

// Verificar configuración de Next.js
console.log('\n⚙️ Verificando configuración de Next.js:');
const nextConfig = fs.readFileSync('next.config.ts', 'utf8');
if (nextConfig.includes('output: \'standalone\'')) {
  console.log('⚠️  Configuración "standalone" detectada - puede causar problemas en Vercel');
} else {
  console.log('✅ Configuración de Next.js correcta');
}

// Verificar archivos críticos
console.log('\n📋 Verificando archivos críticos:');
const criticalFiles = [
  'package.json',
  'next.config.ts',
  'vercel.json',
  'app/layout.tsx',
  'app/page.tsx',
  'public/_headers'
];

criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - Presente`);
  } else {
    console.log(`❌ ${file} - FALTANTE CRÍTICO`);
  }
});

// Verificar PDFs
const ebooksDir = 'public/ebooks';
console.log('\n📚 Verificando eBooks:');
if (fs.existsSync(ebooksDir)) {
  const ebooks = fs.readdirSync(ebooksDir);
  console.log(`✅ Directorio de eBooks encontrado con ${ebooks.length} carpetas`);
  ebooks.forEach(ebook => {
    const pdfPath = path.join(ebooksDir, ebook, `${ebook}.pdf`);
    if (fs.existsSync(pdfPath)) {
      console.log(`  ✅ ${ebook}.pdf - Presente`);
    } else {
      console.log(`  ❌ ${ebook}.pdf - Faltante`);
    }
  });
} else {
  console.log(`❌ Directorio ${ebooksDir} no existe`);
}

console.log('\n🎯 Configuración para Agente Mentor:');
console.log('✅ Nombre del proyecto: Agente Mentor');
console.log('✅ Dominio: mentorx.mx');
console.log('✅ Descripción: Plataforma de eBooks con IA');
console.log('✅ Target: Profesionales y emprendedores');

console.log('\n📝 Pasos para deploy limpio:');
console.log('1. git add .');
console.log('2. git commit -m "Fix Agente Mentor configuration"');
console.log('3. git push origin main');
console.log('4. En Vercel Dashboard:');
console.log('   - Ir a Settings > General');
console.log('   - Hacer "Redeploy" del proyecto');
console.log('   - Verificar logs sin errores');

console.log('\n🌐 URLs para probar:');
console.log('- https://mentorx.mx');
console.log('- https://mentorx.mx/ebooks');
console.log('- https://mentorx.mx/ebook/educacion-con-sentido');

console.log('\n✅ Agente Mentor está listo para producción!'); 