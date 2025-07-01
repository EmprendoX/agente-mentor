const fs = require('fs');
const path = require('path');

// Lista de eBooks y sus rutas de PDF
const EBOOKS = {
  'educacion-con-sentido': {
    pdf_path: '/ebooks/educacion-con-sentido/educacion-con-sentido.pdf',
    cover_path: '/ebooks/educacion-con-sentido/portada.png'
  },
  'como-hacer-que-extranos-compren-tu-propiedad': {
    pdf_path: '/ebooks/como-hacer-que-extranos-compren-tu-propiedad/como-hacer-que-extranos-compren-tu-propiedad.pdf',
    cover_path: '/ebooks/como-hacer-que-extranos-compren-tu-propiedad/como-hacer-que-extranos-compren-tu-propiedad.png'
  },
  'the-product-lab': {
    pdf_path: '/ebooks/the-product-lab/The-Product-Lab-eBook.pdf',
    cover_path: '/ebooks/the-product-lab/The-Product-Lab-eBook.png'
  },
  'accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo': {
    pdf_path: '/ebooks/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo.pdf',
    cover_path: '/ebooks/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo.png'
  },
  'guia-preventas-inmobiliarias': {
    pdf_path: '/ebooks/guia-preventas-inmobiliarias/guia-preventas-inmobiliarias.pdf',
    cover_path: '/ebooks/guia-preventas-inmobiliarias/guia-preventas-inmobiliarias.png'
  },
  'more-leads-ebook': {
    pdf_path: '/ebooks/More-Leads-eBook/More-Leads-eBook.pdf',
    cover_path: '/ebooks/More-Leads-eBook/More-Leads-eBook.png'
  },
  'mas-leads-mas-ventas': {
    pdf_path: '/ebooks/mas-leads-mas-ventas/mas-leads-mas-ventas.pdf',
    cover_path: '/ebooks/mas-leads-mas-ventas/mas-leads-mas-ventas.png'
  },
  'how-to-turn-strangers-into-buyers-real-estate': {
    pdf_path: '/ebooks/how-to-turn-strangers-into-buyers-real-estate/how-to-turn-strangers-into-buyers-real-estate.pdf',
    cover_path: '/ebooks/how-to-turn-strangers-into-buyers-real-estate/how-to-turn-strangers-into-buyers-real-estate.png'
  }
};

function checkFileExists(filePath) {
  const fullPath = path.join(process.cwd(), 'public', filePath);
  return fs.existsSync(fullPath);
}

function getFileSize(filePath) {
  const fullPath = path.join(process.cwd(), 'public', filePath);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    return (stats.size / 1024 / 1024).toFixed(2); // MB
  }
  return 0;
}

console.log('🔍 Verificando archivos de eBooks...\n');

let allFilesExist = true;
const results = [];

for (const [ebookId, files] of Object.entries(EBOOKS)) {
  console.log(`📚 ${ebookId}:`);
  
  const pdfExists = checkFileExists(files.pdf_path);
  const coverExists = checkFileExists(files.cover_path);
  const pdfSize = getFileSize(files.pdf_path);
  const coverSize = getFileSize(files.cover_path);
  
  console.log(`  PDF: ${pdfExists ? '✅' : '❌'} ${files.pdf_path} ${pdfExists ? `(${pdfSize} MB)` : ''}`);
  console.log(`  Cover: ${coverExists ? '✅' : '❌'} ${files.cover_path} ${coverExists ? `(${coverSize} MB)` : ''}`);
  
  if (!pdfExists || !coverExists) {
    allFilesExist = false;
  }
  
  results.push({
    ebookId,
    pdfExists,
    coverExists,
    pdfSize,
    coverSize
  });
  
  console.log('');
}

console.log('📊 Resumen:');
console.log(`Total de eBooks: ${Object.keys(EBOOKS).length}`);
console.log(`PDFs encontrados: ${results.filter(r => r.pdfExists).length}`);
console.log(`Covers encontrados: ${results.filter(r => r.coverExists).length}`);

if (allFilesExist) {
  console.log('\n✅ Todos los archivos están presentes');
  process.exit(0);
} else {
  console.log('\n❌ Faltan algunos archivos');
  console.log('\n📋 Archivos faltantes:');
  
  results.forEach(result => {
    if (!result.pdfExists) {
      console.log(`  ❌ PDF: ${EBOOKS[result.ebookId].pdf_path}`);
    }
    if (!result.coverExists) {
      console.log(`  ❌ Cover: ${EBOOKS[result.ebookId].cover_path}`);
    }
  });
  
  process.exit(1);
} 