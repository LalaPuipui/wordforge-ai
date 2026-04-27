export const metadata = {
  title: "WordForge AI",
  description: "AI-powered copywriting tools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}

