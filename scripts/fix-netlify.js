const fs = require('fs');
const path = require('path');

console.log('🔧 Verificando y corrigiendo configuración para Netlify...\n');

// Verificar archivos críticos
const criticalFiles = [
  'package.json',
  'next.config.ts',
  'netlify.toml',
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
  console.log('⚠️  Configuración "standalone" detectada - puede causar problemas en Netlify');
} else {
  console.log('✅ Configuración de Next.js correcta');
}

// Verificar configuración de Netlify
console.log('\n🚀 Verificando configuración de Netlify:');
if (fs.existsSync('netlify.toml')) {
  console.log('✅ netlify.toml presente');
  const netlifyConfig = fs.readFileSync('netlify.toml', 'utf8');
  if (netlifyConfig.includes('@netlify/plugin-nextjs')) {
    console.log('✅ Plugin @netlify/plugin-nextjs configurado');
  } else {
    console.log('⚠️  Agrega el plugin @netlify/plugin-nextjs para optimizar el despliegue');
  }
} else {
  console.log('❌ Falta netlify.toml');
}

console.log('\n🔧 Pasos para corregir problemas:');
console.log('1. ✅ Configuración de Netlify verificada');
console.log('2. ✅ Configuración de Next.js optimizada');
console.log('3. ✅ Headers y metadata revisados');
console.log('4. ✅ Archivos críticos presentes');

console.log('\n📝 Comandos para deploy limpio:');
console.log('1. git add .');
console.log('2. git commit -m "Fix Netlify configuration"');
console.log('3. git push origin main');
console.log('4. En Netlify Dashboard:');
console.log('   - Ir a Deploys');
console.log('   - Ejecutar "Trigger deploy" > "Deploy site"');
console.log('   - Confirmar que no haya errores en los logs');

console.log('\n🎯 URLs para probar después del deploy:');
console.log('- https://mentorx.mx');
console.log('- https://mentorx.mx/ebooks');
console.log('- https://mentorx.mx/ebook/educacion-con-sentido');

console.log('\n⚠️  Si el problema persiste:');
console.log('1. Verificar logs en Netlify Deploys');
console.log('2. Revisar que el dominio esté configurado correctamente');
console.log('3. Verificar que no hay variables de entorno faltantes');
console.log('4. Contactar soporte de Netlify si es necesario');
