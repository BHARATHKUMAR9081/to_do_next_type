import RightBar from "@/components/RightBar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa">
      <body className="flex overflow-auto gap-[2px] bg-[url('/svg/Background.jpg')] bg-cover bg-center">
        <RightBar />
        {children}
      </body>
    </html>
  );
}
