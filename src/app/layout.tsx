import Footer from "@/components/footer";
import "./globals.css";
import TopNavbar from "@/components/top-navbar";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body>
        <Script id="generate-uuid" strategy="beforeInteractive">
          {`
            //방문자를 구분하기 위한 uuid 발급 및 localstoreage에 삽입
            const uuid = crypto.randomUUID();
            if (!localStorage.getItem('jealth_blog_uuid')) {
              localStorage.setItem('jealth_blog_uuid', uuid);
            }
          `}
        </Script>
        
        <TopNavbar />
        <div id="globalLayout" className="w-full">
          <div className="py-20 max-w-6xl flex justify-center m-auto relative">
            {children}
            
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
