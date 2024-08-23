import MainLayoutProvider from "@/components/MainLayoutProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayoutProvider>{children}</MainLayoutProvider>;
}
