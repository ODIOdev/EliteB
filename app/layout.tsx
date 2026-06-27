import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { BRAND } from "@/lib/constants";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: "Elite Brokers NY | NYC Real Estate",
    template: "%s | Elite Brokers NY",
  },
  description: `Buy, Sell, Rent — Simplified. ${BRAND.broker.name} (@jfebry.therealtor) — licensed NYC metro broker for rentals, sales & investments in the Bronx, Westchester & CT.`,
  keywords: ["NYC real estate", "J Febry realtor", "Riverdale rentals", "Yonkers rentals", "Bronx real estate", "Elite Brokers NY", "rentwithjfebry"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans`}>{children}</body>
    </html>
  );
}
