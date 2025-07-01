import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Mapeo de slugs a rutas de archivos
    const pdfMap: { [key: string]: string } = {
      'educacion-con-sentido': 'educacion-con-sentido/educacion-con-sentido.pdf',
      'como-hacer-que-extranos-compren-tu-propiedad': 'como-hacer-que-extranos-compren-tu-propiedad/como-hacer-que-extranos-compren-tu-propiedad.pdf',
      'the-product-lab': 'the-product-lab/The-Product-Lab-eBook.pdf',
      'accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo': 'accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo/accede-al-mercado-de-bienes-raices-mas-rentable-del-mundo.pdf',
      'guia-preventas-inmobiliarias': 'guia-preventas-inmobiliarias/guia-preventas-inmobiliarias.pdf',
      'mas-leads-mas-ventas': 'mas-leads-mas-ventas/mas-leads-mas-ventas.pdf',
      'More-Leads-eBook': 'More-Leads-eBook/More-Leads-eBook.pdf',
      'how-to-turn-strangers-into-buyers-real-estate': 'how-to-turn-strangers-into-buyers-real-estate/how-to-turn-strangers-into-buyers-real-estate.pdf'
    };

    const pdfPath = pdfMap[slug];
    
    if (!pdfPath) {
      return NextResponse.json(
        { error: 'PDF no encontrado' },
        { status: 404 }
      );
    }

    const fullPath = join(process.cwd(), 'public', 'ebooks', pdfPath);
    
    if (!existsSync(fullPath)) {
      return NextResponse.json(
        { error: 'Archivo PDF no existe' },
        { status: 404 }
      );
    }

    const pdfBuffer = readFileSync(fullPath);
    
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${slug}.pdf"`,
        'X-Frame-Options': 'SAMEORIGIN',
        'Content-Security-Policy': "frame-ancestors 'self'",
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving PDF:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 