import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Pokedex",
  description: "Pokedex",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <h1 className="text-center text-4xl font-bold m-5">
        <Link href="/">Pokedex</Link>
      </h1>
        <div className="flex container mx-auto max-w-4xl h-screen">
          {children}
          {modal}
        </div>
      </body>
    </html>
  );
}
