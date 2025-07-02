import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración básica optimizada
  compress: true,
  poweredByHeader: false,
  
  // Configuración de imágenes simplificada
  images: {
    domains: ['localhost'],
  },
  
  // Headers de seguridad básicos
  async headers() {
    return [
      {
        source: '/ebooks/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
