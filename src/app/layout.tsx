import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claude Cowork \u2014 Votre Assistant IA de Bureau",
  description: "Claude Cowork automatise vos t\u00e2ches bureautiques : cr\u00e9ation de documents, navigation web, g\u00e9n\u00e9ration de code, analyse de donn\u00e9es et plus encore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
