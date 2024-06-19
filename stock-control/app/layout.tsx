import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import "./globals.css";

import { SideBar } from "@/components/sideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stock Control",
  description: "Stock Control App",
  icons: {
    icon: "./public/stockControl-logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>
        <header>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
        <hr />
        <SideBar />
        <main>
          {children}
        </main>
      </body>
    </html>
  </ClerkProvider>
  );
}
