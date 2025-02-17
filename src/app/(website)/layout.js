import {Lato } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import { NextAuthProvider } from "../Providers";

const lato =Lato({subsets:['latin'],weight:['400','700']})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={lato.className}>

      <main>
        <Header/>
        <NextAuthProvider>
        <div className="p-6 max-w-4xl mx-auto">
        {children}
        </div>
        </NextAuthProvider>

      </main>

      
      </body>
    </html>
  );
}
