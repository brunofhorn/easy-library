import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import { Suspense } from "react";

export const metadata = {
  title: 'Easy Educa Library',
  description: 'Sistema Bibliotecário',
  metadataBase: new URL("https://easy-educa-library.vercel.app"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={cx(sfPro.variable, inter.variable, "overflow-x-hidden")}>
        <main className="flex min-h-screen w-full flex-col items-center justify-center">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
