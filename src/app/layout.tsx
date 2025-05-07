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
  title: "Prueba Frotend II - Andres R.W.",
  description: "Por Andrés R.W. para Innerconsulting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-mybg dark:bg-mybgdark flex justify-center items-center
      p-2 md:p-5 font-Man">
        {children}
      </body>
    </html>
  );
}
