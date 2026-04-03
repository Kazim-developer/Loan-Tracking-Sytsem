import "./globals.css";
import TanstackProviders from "./TanstackProviders";
import ReactToastifyProviders from "./ReactToastifyProviders";
import AuthLoader from "@/components/AuthLoader";

export const metadata = {
  title: "Loan Tracking App",
  description: "Track loans and credits",
};

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
            <AuthLoader>{children}</AuthLoader>
          </ReactToastifyProviders>
        </TanstackProviders>
      </body>
    </html>
  );
}
