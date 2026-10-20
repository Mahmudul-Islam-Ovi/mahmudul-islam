import "./globals.css";

export const metadata = {
  title: "Md Mahmudul Islam | Full Stack Developer & Cyber Security",
  description:
    "Portfolio of Md Mahmudul Islam — Full Stack Developer skilled in Web Development, Cyber Security, Networking and AI Automation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body className="font-sans bg-void text-slate-300">{children}</body>
    </html>
  );
}
