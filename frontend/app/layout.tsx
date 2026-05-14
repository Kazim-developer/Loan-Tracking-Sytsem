import "./globals.css";
import TanstackProviders from "../components/providers/TanstackProviders";
import ReactToastifyProviders from "../components/providers/ReactToastifyProviders";
import AuthLoader from "@/components/providers/AuthLoader";
import PaddleScriptTag from "@/components/providers/PaddleScriptTag";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Loqvio — Loan Tracking Software for Lending Businesses",

  description:
    "Loqvio helps lending businesses track loans, repayments, and overdue accounts automatically — no spreadsheets,no manual calculations, no missed payments.",

  metadataBase: new URL("https://loqvio.com"),

  icons: {
    icon: "/assets/icon1.png",
  },

  openGraph: {
    title: "Loqvio — Loan Tracking Software for Lending Businesses",
    description:
      "Track loans, repayments, and overdue accounts automatically — no spreadsheets, no manual calculations, no missed payments.",
    url: "https://loqvio.com",
    siteName: "Loqvio",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Loqvio — Loan Tracking Software for Lending Businesses",
    description:
      "Lending businesses use Loqvio to replace Excel — track every loan, repayment, and overdue account in one place.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <Analytics />
        <TanstackProviders>
          <ReactToastifyProviders>
            <AuthLoader>
              <PaddleScriptTag />
              {children}
            </AuthLoader>
          </ReactToastifyProviders>
        </TanstackProviders>
      </body>
    </html>
  );
}
