import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tiasa - Experience Excellence",
  description: "Tiasa - Experience excellence in every detail. Where quality meets passion, and dreams become reality.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
