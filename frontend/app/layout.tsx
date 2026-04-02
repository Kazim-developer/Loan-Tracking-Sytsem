import "./globals.css";
import TanstackProviders from "./TanstackProviders";
import ReactToastifyProviders from "./ReactToastifyProviders";

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
          <ReactToastifyProviders>{children}</ReactToastifyProviders>
        </TanstackProviders>
      </body>
    </html>
  );
}
