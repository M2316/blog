import Footer from "@/components/footer";
import "./globals.css";
import TopNavbar from "@/components/top-navbar";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        
        <TopNavbar />
        <div className="py-20 max-w-6xl flex justify-center m-auto relative">
          {children}
          
        </div>
        <Footer />
      </body>
    </html>
  );
}
