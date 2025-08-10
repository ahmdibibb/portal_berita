import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.english-efl.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ichef.bbci.co.uk",
        port: "",
        pathname: "/**",
      },
      // Tambahkan pattern umum untuk domain yang sering digunakan
      {
        protocol: "https",
        hostname: "*.bbci.co.uk",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.reuters.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.ap.org",
        port: "",
        pathname: "/**",
      },
    ],
    // Izinkan gambar dari domain lokal
    domains: ["localhost"],
  },
};

export default nextConfig;
