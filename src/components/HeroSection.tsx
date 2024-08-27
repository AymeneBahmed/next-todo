import manSmilingImage from "@/assets/man-smiling.webp";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function HeroSection() {
  // TODO: Reimplement
  return (
    <div className="h-full flex items-center justify-around flex-wrap relative">
      <div className="w-[40rem] space-y-[30px]">
        <p className="text-[48px] font-bold capitalize line leading-none]">
          Boost your{" "}
          <span className="bg-gradient-to-br from-primary to-blue-500 bg-clip-text text-transparent capitalize">
            productivity
          </span>{" "}
          and{" "}
          <span className="bg-gradient-to-br from-emerald-300 to-emerald-500 bg-clip-text text-transparent capitalize">
            save time
          </span>{" "}
          with Todo
        </p>
        <p className="text-[25px] w-4/5 text-gray-700">
          Stop worrying about your time and life. Life should not be complicated
          and Todo helps you to keep it simple.
        </p>
        <Button className="rounded-full text-[20px] w-[180px] h-[51px]" asChild>
          {/* <Link href={user ? "/dashboard" : "/signup"}>Get Started</Link> */}
          <Link href={"/signup"}>Get Started</Link>
        </Button>
      </div>

      <div className="absolute top-[0%] blur-[50px] bg-gradient-to-r from-emerald-200 via-[#FFAFBD] to-blue-300 h-[40px] w-full"></div>
      <div className="absolute bottom-[0%] blur-[50px] bg-gradient-to-r from-emerald-200 via-[#FFAFBD] to-blue-300 h-[40px] w-full"></div>

      <div className="relative">
        <Image
          src={manSmilingImage}
          alt="man-smiling"
          className="size-[552px] object-cover rounded-full"
        />
        <div className="absolute size-full scale-[1.04] rounded-full -z-10 top-0 left-0 bg-gradient-to-br from-emerald-300 to-primary"></div>
      </div>
    </div>
  );
}
