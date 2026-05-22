import type { Metadata } from "next";
import { Chivo, Cormorant_Garamond, Space_Mono, Inter } from "next/font/google";
import { BookCheckoutDrawerWrapper } from "@/components/checkout/book-checkout-drawer-wrapper";
import { ConditionalShell } from "@/components/conditional-shell";
import { CartProvider } from "@/context/cart-context";
import "./globals.css";

const chivo = Chivo({
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-chivo",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nestor Walters",
  description:
    "Fiction, poetry, essays and tutorials by Navy veteran and earth scientist Nestor Walters.",
  keywords: [
    "Nestor Walters",
    "veteran writer",
    "poet",
    "earth scientist",
    "Navy veteran",
    "environmental ethics",
    "Stanford",
    "University of Maine",
  ],
  authors: [{ name: "Nestor Walters", url: "https://swordcirclepen.com" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "Nestor Walters",
    locale: "en_US",
    url: "https://swordcirclepen.com",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nestorwalters",
    creator: "@nestorwalters",
  },
  icons: {
    icon: "/assets/ico.png",
    shortcut: "/assets/ico.png",
    apple: "/assets/ico.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${chivo.variable} ${cormorant.variable} ${spaceMono.variable} ${inter.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-black text-zinc-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nestor Walters",
              description: "Navy veteran, poet, and earth scientist",
              url: "https://swordcirclepen.com",
              sameAs: [],
              jobTitle: ["Writer", "Poet", "Earth Scientist", "Public Speaker"],
              alumniOf: ["Stanford University", "University of Maine"],
            }),
          }}
        />
        <CartProvider>
          <ConditionalShell>
            <div className="relative isolate z-0 flex flex-1 flex-col">{children}</div>
          </ConditionalShell>
          <BookCheckoutDrawerWrapper />
        </CartProvider>
      </body>
    </html>
  );
}
