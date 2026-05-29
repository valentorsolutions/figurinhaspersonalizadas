import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sua Figurinha da Copa 2026 | Crie Agora",
  description: "Crie sua figurinha personalizada da Copa do Mundo 2026! Sua foto ao lado dos craques. Impressão profissional por apenas R$12,90.",
  keywords: "figurinha copa 2026, figurinha personalizada, copa do mundo 2026, figurinha criança",
  openGraph: {
    title: "Sua Figurinha da Copa 2026",
    description: "Crie sua figurinha personalizada da Copa do Mundo 2026!",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sua Figurinha da Copa 2026",
    description: "Crie sua figurinha personalizada da Copa do Mundo 2026!",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Squada+One&family=Kalam:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
