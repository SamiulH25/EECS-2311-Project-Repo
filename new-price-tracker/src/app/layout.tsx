import "./styles/globals.css"
import { BlitzProvider } from "./blitz-client"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: { title: "Price Tracker", template: "%s – Blitz" },
  description: "Your One-Stop Shop to Cop Items at Dropped Prices ",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BlitzProvider>
          <>{children}</>
        </BlitzProvider>
      </body>
    </html>
  )
}
