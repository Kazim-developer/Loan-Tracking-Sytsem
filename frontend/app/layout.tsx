import "./globals.css";
import TanstackProviders from "./TanstackProviders";
import ReactToastifyProviders from "./ReactToastifyProviders";
import AuthLoader from "@/components/providers/AuthLoader";
import PaddleScriptTag from "@/components/providers/PaddleScriptTag";
import SubscriptionProvider from "@/components/providers/SubscriptionProvider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
