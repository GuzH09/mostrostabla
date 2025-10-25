import type { Metadata, Viewport } from "next";
import Image from "next/image";
import logo from "@/assets/logo.webp";
import "./globals.css";

export const metadata: Metadata = {
  title: "Torneo Oficial Viernes de Gordos",
  description:
    "Torneo oficial viernes de gordos sponsoreado por Mostros Gaming",
  keywords: [
    "Mostros Gaming",
    "Torneo",
    "Viernes de Gordos",
    "Sponsoreado",
    "Mostros Gaming Tabla",
    "Mostros Gaming Tabla Oficial",
    "Mostros Gaming Tabla Oficial Viernes de Gordos",
  ],
  authors: [
    { name: "Mostros Gaming", url: "https://mostrostabla.vercel.app/" },
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Torneo Oficial Viernes de Gordos",
    description:
      "Torneo oficial viernes de gordos sponsoreado por Mostros Gaming",
    url: "https://mostrostabla.vercel.app/",
    siteName: "Mostros Gaming Tabla Oficial Viernes de Gordos",
    type: "website",
    images: [
      {
        url: "https://mostrostabla.vercel.app/img/banner.jpeg",
        width: 1200,
        height: 675,
        alt: "Torneo Oficial Viernes de Gordos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Torneo Oficial Viernes de Gordos",
    description:
      "Torneo oficial viernes de gordos sponsoreado por Mostros Gaming",
    creator: "@guzhotero",
    images: ["https://mostrostabla.vercel.app/img/banner.jpeg"],
  },
  alternates: { canonical: "https://mostrostabla.vercel.app/" },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`antialiased`}>
        <section className="bg-linear-to-br from-gray-800 via-gray-900 to-black">
          <header className="relative overflow-hidden pt-20">
            <div className="relative z-10 container mx-auto px-4 text-white">
              <div className="mx-auto max-w-7xl">
                <div className="mb-4 text-center">
                  <div className="mx-auto mb-6 flex items-center justify-center">
                    <div className="relative h-32 w-32 rounded-full border-4 border-[#3FA6E8] bg-linear-to-br from-gray-800 to-gray-900 shadow-xl shadow-[#3FA6E8]/20 md:h-40 md:w-40">
                      <div className="relative h-full w-full overflow-hidden rounded-full">
                        <Image
                          src={logo}
                          alt="Mostros Gaming Logo"
                          fill
                          sizes="(max-width: 768px) 8rem, 10rem"
                          className="h-full w-full object-contain"
                          priority
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]"></div>
                      </div>
                    </div>
                  </div>
                  <h1 className="mb-1 text-2xl font-bold md:text-4xl">
                    <span className="bg-linear-to-r from-[#3FA6E8] via-[#F5C255] to-[#39DE42] bg-clip-text text-transparent">
                      Torneo Oficial Viernes de Gordos
                    </span>
                  </h1>
                  <h2 className="text-base font-semibold text-white md:text-xl">
                    Sponsoreado por Mostros Gaming
                  </h2>
                </div>
              </div>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t border-gray-800 py-4 text-center text-sm text-gray-400">
            © 2025 Mostros Gaming
          </footer>
        </section>
      </body>
    </html>
  );
}
