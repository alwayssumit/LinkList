import "../globals.css";
import { NextAuthProvider } from "../Providers";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AppSidebar from "@/components/layout/AppSidebar";
import { Inter, Lato } from "next/font/google";
import { Toaster } from "react-hot-toast";
import mongoose from "mongoose";
import { Page } from "@/models/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faLink } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const lato =Lato({subsets:['latin'],weight:['400','700']})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default async function AppTemplate({ children }) {
  mongoose.connect(process.env.MONGODB_URI);
  const session=await getServerSession(authOptions);
if(!session) redirect('/');

const page=await Page.findOne({owner:session.user.email});
  return (
    <html lang="en">
      <body className={lato.className}>
      <Toaster/>
      <main className="md:flex min-h-screen">
      <label htmlFor="navCb" className="md:hidden ml-8 pt-4  p-4 rounded-md bg-white shadow inline-flex items-center gap-2 cursor-pointer">
          <FontAwesomeIcon icon={faBars}/>
          <span>Open Navigation</span>
         </label>
         <input id="navCb" type="checkbox" className="hidden"/>
         <label htmlFor="navCb" className="hidden backdrop fixed inset-0 bg-black/80 z-10"></label>
      <aside className="bg-white w-48 p-4 pt-6 shadow fixed md:static -left-48 top-0 bottom-0 z-20 transition-all">
      <div className="sticky top-0 pt-2">
      <div className="rounded-full overflow-hidden
      aspect-square w-24 mx-auto">
            <Image src={session.user.image} height={256} width={256} alt={'avatar'}/>
         </div>
         {page && (
          <Link
          target="_blank"
          href={'/'+page.uri} className="text-center mt-4 flex gap-1 items-center justify-center">
          <FontAwesomeIcon icon={faLink} size="lg" className="text-blue-500"/>
          <span className="text-xl text-gray-300">/</span>
          <span>{page.uri}</span>
          </Link>
         )}
         <div className="text-center">
           <AppSidebar/>
         </div>
      </div>
      </aside>
        <NextAuthProvider>
        <div className="grow">
            {children}
        </div>
        </NextAuthProvider>

      </main>

      
      </body>
    </html>
  );
}
