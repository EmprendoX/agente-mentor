import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Optimizaciones para producción
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  // Configuración de imágenes
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Configuración para archivos estáticos (PDFs)
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Configuración de output para producción
  output: 'standalone',
  
  // Headers de seguridad específicos para PDFs
  async headers() {
    return [
      {
        source: '/ebooks/(.*)',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/pdf',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Configuración de webpack para PDFs
  webpack: (config, { isServer }) => {
    // Configurar manejo de archivos PDF
    config.module.rules.push({
      test: /\.pdf$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });
    
    return config;
  },
};

export default nextConfig;
