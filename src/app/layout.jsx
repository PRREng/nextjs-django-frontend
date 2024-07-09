import { Inter } from "next/font/google";
import "@/app/ui/globals.css";
import { AuthProvider } from "@/components/authProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Atron Dashboard",
  description: "Dashboard oficial da Atron Energia Solar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
