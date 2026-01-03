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
    <div className="h-screen flex flex-col bg-black overflow-hidden" suppressHydrationWarning>
      <div className="flex-1 relative transition-all duration-500">
        {children}
      </div>
      <footer className="py-4 text-center text-gray-500 bg-black border-t border-white/5 relative z-30">
        <p className="text-xs tracking-widest font-medium opacity-50 hover:opacity-100 transition-opacity">
          © 2026 ANTIGRAVITY ENTERPRISE • ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
}
