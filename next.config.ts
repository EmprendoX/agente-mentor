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
  
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
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
};

export default nextConfig;
