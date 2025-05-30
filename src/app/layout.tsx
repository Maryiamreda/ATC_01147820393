import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getUserFromSession } from '../../lib/auth'
import { ThemeProvider } from "@/context/ThemeProvider";
import Navbar from "./components/Navbar";

// Inter is very similar to Geist Sans
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

// JetBrains Mono is a good alternative to Geist Mono
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserFromSession();
  const isLoggedIn = !!user?.userId;
  console.log("User:", user?.userId);
  console.log("Is logged in:", isLoggedIn);
  
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <ThemeProvider> 
        <body>
          <Navbar isLoggedIn={isLoggedIn}/>
          {children}
        </body>
      </ThemeProvider>  
    </html>
  );
}