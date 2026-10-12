import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DabarViz",
  description: "Visualizing the Word of God through its interconnected tapestry",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
