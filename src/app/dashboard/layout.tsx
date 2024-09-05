import backgroundImg from "@/assets/background.jpg";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="size-full bg-gradient-to-b from-teal-400 to-blue-500">
      <Image src={backgroundImg} alt="" fill quality={100} />

      {children}
    </div>
  );
}
