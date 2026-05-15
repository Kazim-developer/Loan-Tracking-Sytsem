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
  title: {
    default: "Loqvio — Loan Tracking Software for Lending Businesses",
    template: "%s — Loqvio",
  },

  description:
    "Loqvio helps lending businesses track loans, repayments, and overdue accounts automatically — no spreadsheets, no manual calculations, no missed payments.",

  metadataBase: new URL("https://loqvio.com"),

  keywords: [
    "loan tracking software",
    "loan management software",
    "microfinance software",
    "repayment tracking",
    "lending business software",
    "loan tracker",
    "replace excel loan tracking",
  ],

  authors: [{ name: "Loqvio", url: "https://loqvio.com" }],

  creator: "Loqvio",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

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
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Loqvio — Loan Tracking Software for Lending Businesses",
    description:
      "Lending businesses use Loqvio to replace Excel — track every loan, repayment, and overdue account in one place.",
    creator: "@loqvio",
  },

  alternates: {
    canonical: "https://loqvio.com",
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
