import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solar Phoenix",
  description: "Deixe o sol pagar a sua conta de energia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
