import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Web app using Next.js and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
