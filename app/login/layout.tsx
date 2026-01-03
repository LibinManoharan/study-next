import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col" suppressHydrationWarning>
      <div className="flex-1">
        {children}
      </div>
      <footer className="py-4 text-center text-gray-500 bg-white border-t">
        My Website Footer @ 2026
      </footer>
    </div>
  );
}
