import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import AlchemicalSeal from "@/components/AlchemicalSeal";
import { getPosts } from "@/lib/posts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Madi LTS",
  description: "A place for thoughts and projects.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await getPosts();
  const sidebarPosts = posts.map(({ id, title }) => ({ id, title }));

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} antialiased`}
      >
        <AlchemicalSeal />
        <div className="flex min-h-screen mx-auto max-w-6xl py-8 px-6">
          <Sidebar posts={sidebarPosts} />
          <main className="flex-1 min-w-0 pl-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
