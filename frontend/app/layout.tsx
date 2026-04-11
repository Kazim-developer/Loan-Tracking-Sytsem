import "./globals.css";
import TanstackProviders from "./TanstackProviders";
import ReactToastifyProviders from "./ReactToastifyProviders";
import AuthLoader from "@/components/AuthLoader";
import PaddleScriptTag from "@/components/PaddleScriptTag";

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
              {children}
            </AuthLoader>
          </ReactToastifyProviders>
        </TanstackProviders>
      </body>
    </html>
  );
}
