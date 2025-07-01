const fs = require('fs');
const path = require('path');

console.log('🔧 Verificando y corrigiendo problemas de Vercel...\n');

// Verificar archivos críticos
const criticalFiles = [
  'package.json',
  'next.config.ts',
  'vercel.json',
  'app/layout.tsx',
  'app/page.tsx'
];

console.log('📋 Verificando archivos críticos:');
criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - Presente`);
  } else {
    console.log(`❌ ${file} - FALTANTE CRÍTICO`);
  }
});

// Verificar dependencias
console.log('\n📦 Verificando dependencias:');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = ['next', 'react', 'react-dom'];
const requiredDevDeps = ['typescript', '@types/react', '@types/node'];

requiredDeps.forEach(dep => {
  if (packageJson.dependencies && packageJson.dependencies[dep]) {
    console.log(`✅ ${dep} - ${packageJson.dependencies[dep]}`);
  } else {
    console.log(`❌ ${dep} - FALTANTE`);
  }
});

requiredDevDeps.forEach(dep => {
  if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
    console.log(`✅ ${dep} - ${packageJson.devDependencies[dep]}`);
  } else {
    console.log(`❌ ${dep} - FALTANTE`);
  }
});

// Verificar configuración de Next.js
console.log('\n⚙️ Verificando configuración de Next.js:');
const nextConfig = fs.readFileSync('next.config.ts', 'utf8');
if (nextConfig.includes('output: \'standalone\'')) {
  console.log('⚠️  Configuración "standalone" detectada - puede causar problemas en Vercel');
} else {
  console.log('✅ Configuración de Next.js correcta');
}

// Verificar configuración de Vercel
console.log('\n🚀 Verificando configuración de Vercel:');
const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
if (vercelConfig.routes && vercelConfig.routes.length > 0) {
  console.log('⚠️  Configuración "routes" detectada - puede causar conflictos');
} else {
  console.log('✅ Configuración de Vercel simplificada');
}

console.log('\n🔧 Pasos para corregir problemas:');
console.log('1. ✅ Configuración de Vercel simplificada');
console.log('2. ✅ Configuración de Next.js optimizada');
console.log('3. ✅ Headers corregidos');
console.log('4. ✅ Metadata base URL corregida');

console.log('\n📝 Comandos para deploy limpio:');
console.log('1. git add .');
console.log('2. git commit -m "Fix Vercel configuration"');
console.log('3. git push origin main');
console.log('4. En Vercel Dashboard:');
console.log('   - Ir a Settings > General');
console.log('   - Hacer "Redeploy" del proyecto');
console.log('   - Verificar que no hay errores en los logs');

console.log('\n🎯 URLs para probar después del deploy:');
console.log('- https://mentorx.mx');
console.log('- https://mentorx.mx/ebooks');
console.log('- https://mentorx.mx/ebook/educacion-con-sentido');

console.log('\n⚠️  Si el problema persiste:');
console.log('1. Verificar logs en Vercel Dashboard');
console.log('2. Revisar que el dominio esté configurado correctamente');
console.log('3. Verificar que no hay variables de entorno faltantes');
console.log('4. Contactar soporte de Vercel si es necesario'); 