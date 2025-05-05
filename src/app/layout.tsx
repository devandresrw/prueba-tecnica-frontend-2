import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  width: "device-width",
}

export const metadata: Metadata = {
  title: "Prueba - Frotend 2",
  description: "Por Andrés R.W. para Innerconsulting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
