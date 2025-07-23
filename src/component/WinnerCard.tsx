import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBars, FaPlay, FaRegHandshake } from "react-icons/fa6";

interface WinnerCardProps {
  className?: string;
  barProgress: number;
  address: string;
  percentage: number;
  tokenAmount: number;
  explorerAddress: string;


}

const WinnerCard: React.FC<WinnerCardProps> = ({ className, barProgress, address, percentage, tokenAmount, explorerAddress}) => {
  const pathName = usePathname();
  return (
    <>
    <div className="hover:scale-102 active:scale-100 h-40 bg-stone-900 bg-opacity-60 rounded-lg p-5 pt-4     flex flex-col gap-5">
        {address == "Check the Explorer to see more"&&<a target="_blank" href={"https://mumbai.polygonscan.com/address/"+explorerAddress} className="m-auto text-gray-300 text-base font-medium leading-tight tracking-wide">
        {address}
        </a>}
        {address != "Check the Explorer to see more"&&<div className="text-gray-300 text-base font-medium leading-tight tracking-wide">
            {address}
        </div>}

        {percentage&&<div className="xl:flex lg:hidden md:flex text-red-800 text-base font-normal leading-tight tracking-wide">
            Won x Tokens with {percentage} %
        </div>}
        {percentage&&<div className="xl:hidden lg:flex md:hidden hidden text-red-800 text-base font-normal leading-tight tracking-wide">
            Won x Tokens - {percentage} % 
        </div>}
        {tokenAmount&&<div className="text-gray-300 text-base font-medium leading-tight tracking-wide">
            Winning: {tokenAmount} Tokens
        </div>}
        {barProgress&&<div className="w-full h-1 relative bg-stone-800 rounded-2xl">
            <div
            className="h-1 absolute bg-red-800 rounded-2xl"
            style={{
                width: barProgress + "%",
                transition: "width 1s ease-in-out",
            }}
            ></div>
        </div>}
    </div>
        </>
  );
}
export default WinnerCard;
