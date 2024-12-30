import { TanstackProvider } from "@/components/providers/query-provider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanstackProvider>
      <main className="flex items-center h-screen">{children}</main>
    </TanstackProvider>
  );
}
