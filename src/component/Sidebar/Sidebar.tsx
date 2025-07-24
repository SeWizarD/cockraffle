import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBars, FaPlay, FaRegHandshake } from "react-icons/fa6";

interface SidebarProps {
  className?: string;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, toggleSidebar }) => {
  const pathName = usePathname();
  return (
    <div
      className={cn(
        "lg:h-[90dvh] h-screen mt-4 lg:bg-stone-900 bg-black lg:bg-opacity-60 rounded-lg",
        className
      )}
    >
      <section className="mt-5 mr-5">
        <div
          className="opacity-70 transition-opacity hover:opacity-100 hidden lg:flex flex-col justify-end items-end cursor-pointer"
          onClick={toggleSidebar}
        >
          <FaBars color={"#D3CFDD"} size={20} />
        </div>
        <div className="flex  flex-col gap-1 justify-center items-center mt-10">
          <Link href={`/`}>
            <div
              className={`hover:scale-102 active:scale-100 flex flex-row items-center w-[60dvw] lg:w-[20dvw] h-12 ${
                pathName == "/" && "active"
              }`}
            >
              <FaPlay color={"#D3CFDD"} size={20} className="ml-6 focus:pointer-events-auto" />
              <div className="w-full text-gray-300 text-lg text-center font-medium leading-tight tracking-wide">
                PLAY
              </div>
            </div>
          </Link>
          {/* <Link href={`/stake`}>
            <div
              className={`hover:scale-102 active:scale-100 flex flex-row items-center w-[60dvw] lg:w-[20dvw] h-12 ${
                pathName == "/stake" && "active"
              }`}
            >
              <FaBars color={"#D3CFDD"} size={20} className="ml-6" />
              <div className="w-full text-gray-300 text-lg text-center font-medium leading-tight tracking-wide">
                STAKE
              </div>
            </div>
          </Link> */}
          {/* <Link href={`/partners`}>
            <div
              className={`hover:scale-102 active:scale-100 flex flex-row items-center w-[60dvw] lg:w-[20dvw] h-12 ${
                pathName == "/partners" && "active"
              }`}
            >
              <FaRegHandshake color={"#D3CFDD"} size={20} className="ml-6 " />
              <div className="w-full text-gray-300 text-lg text-center font-medium leading-tight tracking-wide">
                PARTNERS
              </div>
            </div>
          </Link> */}
          <div
            className={`hover:scale-102 active:scale-100 flex flex-row items-center w-[60dvw] lg:w-[20dvw] h-12 ${
              pathName == "/partners" && "active"
            }`}
          >
            <FaRegHandshake color={"#D3CFDD"} size={20} className="ml-6 " />
            <div className="w-full text-gray-300 text-lg text-center font-medium leading-tight tracking-wide">
              COMING SOON!
            </div>
          </div>
          <Link href="https://farcaster.xyz/~/token/COCK">
          <div
            className={`hover:scale-102 active:scale-100 flex flex-row items-center w-[60dvw] lg:w-[20dvw] h-12 ${
              pathName == "/partners" && "active"
            }`}
            >
            <FaRegHandshake color={"#D3CFDD"} size={20} className="ml-6 " />
            <div className="w-full text-gray-300 text-lg text-center font-medium leading-tight tracking-wide">
              BUY COCK
            </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
