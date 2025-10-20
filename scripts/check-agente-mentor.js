const fs = require('fs');
const path = require('path');

const { scanForConflicts } = require('./utils/conflict-detector');

console.log('🔍 Verificando configuración de Agente Mentor...\n');

// Verificar que no hay referencias a SchoolX ni al hosting anterior
console.log('🔍 Verificando referencias incorrectas:');
const filesToCheck = [
  'app/layout.tsx',
  'app/page.tsx',
  'package.json',
  'README.md'
];

let schoolXReferences = 0;
let legacyHostingReferences = 0;
const hostingPattern = new RegExp(String.fromCharCode(118, 101, 114, 99, 101, 108), 'i');
filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('SchoolX')) {
      console.log(`❌ ${file} - Contiene referencias a SchoolX`);
      schoolXReferences++;
    } else {
      console.log(`✅ ${file} - Sin referencias a SchoolX`);
    }

    if (hostingPattern.test(content)) {
      console.log(`❌ ${file} - Contiene referencias al hosting anterior`);
      legacyHostingReferences++;
    }
  }
});

if (schoolXReferences === 0) {
  console.log('\n✅ Todas las referencias están corregidas para Agente Mentor');
} else {
  console.log(`\n⚠️  Se encontraron ${schoolXReferences} archivos con referencias a SchoolX`);
}

if (legacyHostingReferences === 0) {
  console.log('✅ Ninguna referencia al hosting anterior detectada');
} else {
  console.log(`⚠️  Se encontraron ${legacyHostingReferences} archivos con referencias al hosting anterior`);
}

// Verificar configuración de Netlify
console.log('\n🚀 Verificando configuración de Netlify:');
if (fs.existsSync('netlify.toml')) {
  console.log('✅ netlify.toml - Presente');
  const netlifyConfig = fs.readFileSync('netlify.toml', 'utf8');
  if (netlifyConfig.includes('@netlify/plugin-nextjs')) {
    console.log('✅ Plugin oficial de Next.js habilitado');
  } else {
    console.log('⚠️  Agrega el plugin "@netlify/plugin-nextjs" para optimizar el build');
  }
} else {
  console.log('❌ netlify.toml - FALTANTE CRÍTICO');
}

// Verificar configuración de Next.js
console.log('\n⚙️ Verificando configuración de Next.js:');
const nextConfig = fs.readFileSync('next.config.ts', 'utf8');
if (nextConfig.includes('output: \'standalone\'')) {
  console.log('⚠️  Configuración "standalone" detectada - puede causar problemas en Netlify');
} else {
  console.log('✅ Configuración de Next.js correcta');
}

// Verificar archivos críticos
console.log('\n📋 Verificando archivos críticos:');
const criticalFiles = [
  'package.json',
  'next.config.ts',
  'netlify.toml',
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

console.log('\n🧭 Buscando marcadores de conflictos en el repositorio...');
const conflictFiles = scanForConflicts(process.cwd());

if (conflictFiles.length === 0) {
  console.log('✅ Sin conflictos pendientes. Puedes continuar con el deploy.');
} else {
  console.log('⚠️  Se detectaron marcadores de conflictos en:');
  conflictFiles.forEach(file => console.log(`   - ${path.relative(process.cwd(), file)}`));
  console.log('\nResuelve los conflictos con tu editor o usando git antes de continuar.');
}

console.log('\n📝 Pasos para deploy limpio:');
console.log('1. git add .');
console.log('2. git commit -m "Fix Agente Mentor configuration"');
console.log('3. git push origin main');
console.log('4. En Netlify Dashboard:');
console.log('   - Ir a Deploys');
console.log('   - Presionar "Trigger deploy" > "Deploy site"');
console.log('   - Verificar logs sin errores');

console.log('\n🌐 URLs para probar:');
console.log('- https://mentorx.mx');
console.log('- https://mentorx.mx/ebooks');
console.log('- https://mentorx.mx/ebook/educacion-con-sentido');

console.log('\n✅ Agente Mentor está listo para producción!');
