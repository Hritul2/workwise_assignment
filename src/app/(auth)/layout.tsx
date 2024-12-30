import { Toaster } from "@/components/ui/sonner";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex items-center justify-center h-screen px-4 sm:px-6 md:px-8 bg-gray-100">
      {children}
      <Toaster />
    </main>
  );
}
