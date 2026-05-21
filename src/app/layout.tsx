import type { Metadata } from "next";
import { BookCheckoutDrawerWrapper } from "@/components/checkout/book-checkout-drawer-wrapper";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CartProvider } from "@/context/cart-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nestor Walters",
  description: "Fiction, poetry, essays and tutorials by Navy veteran and earth scientist Nestor Walters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="antialiased"
    >
      <body className="flex min-h-screen flex-col bg-black text-zinc-100">
        <CartProvider>
          <SiteHeader />
          <div className="relative isolate z-0 flex flex-1 flex-col">{children}</div>
          <SiteFooter />
          <BookCheckoutDrawerWrapper />
        </CartProvider>
      </body>
    </html>
  );
}
