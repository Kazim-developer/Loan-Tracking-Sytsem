import "./globals.css";
import TanstackProviders from "./TanstackProviders";
import ReactToastifyProviders from "./ReactToastifyProviders";
import AuthLoader from "@/components/providers/AuthLoader";
import PaddleScriptTag from "@/components/providers/PaddleScriptTag";
import SubscriptionProvider from "@/components/providers/SubscriptionProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
