import "./globals.css";
import TanstackProviders from "../components/providers/TanstackProviders";
import ReactToastifyProviders from "../components/providers/ReactToastifyProviders";
import AuthLoader from "@/components/providers/AuthLoader";
import PaddleScriptTag from "@/components/providers/PaddleScriptTag";
import SubscriptionProvider from "@/components/providers/SubscriptionProvider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Loqvio - Simple Loan & Repayment Tracking for Businesses",

  description:
    "Track client loans, repayments, and outstanding balances in one place. Loqvio helps you stay organized, automate tracking, and eliminate manual spreadsheets.",

  metadataBase: new URL("https://www.loqvio.com"),

  icons: {
    icon: "/assets/icon1.png",
  },

  openGraph: {
    title: "Loqvio - Loan & Repayment Tracking System",
    description:
      "Manage client loans, track repayments, and stay on top of balances with a simple, automated system built for businesses.",
    url: "https://www.loqvio.com",
    siteName: "Loqvio",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Loqvio - Loan Tracking Made Simple",
    description:
      "Manage client loans and repayments without spreadsheets. Simple, fast, and automated.",
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
        <TanstackProviders>
          <ReactToastifyProviders>
            <AuthLoader>
              <PaddleScriptTag />
              <SubscriptionProvider>{children}</SubscriptionProvider>
            </AuthLoader>
          </ReactToastifyProviders>
        </TanstackProviders>
      </body>
    </html>
  );
}
