import type { Metadata, Viewport } from "next";
import "./globals.css";
import "../../public/fontawesome/css/fontawesome.min.css";
import "../../public/fontawesome/css/brands.min.css";
import "../../public/fontawesome/css/solid.min.css";
import ReduxStoreProvider from "./redux-store-provider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,

};

export const metadata: Metadata = {
  title: "EasyEdit PDF",
  description: "Effortless AI PDF Editing, Anytime, Anywhere.",
  icons: {
    shortcut: "/favicon.ico",
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180"
    },
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" }
    ]
  },
  manifest: "/manifest.json",
  twitter: {
    card: "summary",
    site: "https://easyeditpdf.vercel.ap[",
    title: "EasyEdit PDF",
    description: "Effortless AI PDF Editing, Anytime, Anywhere.",
    images: [{ url: "https://instagram.fjdh1-3.fna.fbcdn.net/v/t51.2885-19/455129165_9150463018313569_5333810212291446630_n.jpg?_nc_ht=instagram.fjdh1-3.fna.fbcdn.net&_nc_cat=101&_nc_ohc=Tg24DAaI4SMQ7kNvgGcPGw6&edm=APHcPcMBAAAA&ccb=7-5&oh=00_AYBK8KCd_04Y7x67qwvRq4E4yFJqV37mLSMMQrjHS6CSCg&oe=66C391F7&_nc_sid=bef7bc" }],
    creator: "@AnshulSoni2010"
  },
  openGraph: {
    type: "website",
    title: "EasyEdit PDF",
    description: "Effortless AI PDF Editing, Anytime, Anywhere.",
    siteName: "EasyEdit PDF",
    url: "https://next-pdftoolkit.subhamk.com",
    images: [{ url: "https://instagram.fjdh1-3.fna.fbcdn.net/v/t51.2885-19/455129165_9150463018313569_5333810212291446630_n.jpg?_nc_ht=instagram.fjdh1-3.fna.fbcdn.net&_nc_cat=101&_nc_ohc=Tg24DAaI4SMQ7kNvgGcPGw6&edm=APHcPcMBAAAA&ccb=7-5&oh=00_AYBK8KCd_04Y7x67qwvRq4E4yFJqV37mLSMMQrjHS6CSCg&oe=66C391F7&_nc_sid=bef7bc" }]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxStoreProvider>
      <html className="max-w-[100vw] overflow-x-hidden" lang="en">
        {/* <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
        <title>EasyEdit PDF</title>
        <meta name="description" content="Effortless AI PDF Editing, Anytime, Anywhere." />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://next-pdftoolkit.subhamk.com" />
        <meta name="twitter:title" content="EasyEdit PDF" />
        <meta name="twitter:description" content="Effortless AI PDF Editing, Anytime, Anywhere." />
        <meta name="twitter:image" content="https://instagram.fjdh1-3.fna.fbcdn.net/v/t51.2885-19/455129165_9150463018313569_5333810212291446630_n.jpg?_nc_ht=instagram.fjdh1-3.fna.fbcdn.net&_nc_cat=101&_nc_ohc=Tg24DAaI4SMQ7kNvgGcPGw6&edm=APHcPcMBAAAA&ccb=7-5&oh=00_AYBK8KCd_04Y7x67qwvRq4E4yFJqV37mLSMMQrjHS6CSCg&oe=66C391F7&_nc_sid=bef7bc" />
        <meta name="twitter:creator" content="@AnshulSoni2010" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="EasyEdit PDF" />
        <meta property="og:description" content="Effortless AI PDF Editing, Anytime, Anywhere." />
        <meta property="og:site_name" content="EasyEdit PDF" />
        <meta property="og:url" content="https://next-pdftoolkit.subhamk.com" />
        <meta property="og:image" content="https://instagram.fjdh1-3.fna.fbcdn.net/v/t51.2885-19/455129165_9150463018313569_5333810212291446630_n.jpg?_nc_ht=instagram.fjdh1-3.fna.fbcdn.net&_nc_cat=101&_nc_ohc=Tg24DAaI4SMQ7kNvgGcPGw6&edm=APHcPcMBAAAA&ccb=7-5&oh=00_AYBK8KCd_04Y7x67qwvRq4E4yFJqV37mLSMMQrjHS6CSCg&oe=66C391F7&_nc_sid=bef7bc" />
      </head> */}

        <body className="max-w-[100vw] overflow-x-hidden text-[#F8EDED] bg-[#173B45]">
          {children}
        </body>
      </html>
    </ReduxStoreProvider>
  );
}
