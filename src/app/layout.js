import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import { Inter } from "next/font/google";
import "./globals.css";
import BootstrapClient from "./components/BootstrapClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eco2 Balance",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <BootstrapClient/>
        </body>
    </html>
  );
}
