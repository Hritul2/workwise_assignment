import { Toaster } from "@/components/ui/sonner";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex items-center h-screen">
      {children}
      <Toaster />
    </main>
  );
}
