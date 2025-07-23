import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Separator } from "../ui/separator";
import { FaBars } from "react-icons/fa6";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import WalletConnectButton from "./WalletConnectButton";

interface HeaderSectionProps {
  toggleSidebar: () => void;
}
interface NavigationItem {
  name: string;
}

const navigation: NavigationItem[] = [
  {
    name: "Disconnect",
  },
  { name: "OxAdress" },
];



const Header: React.FC<HeaderSectionProps> = ({ toggleSidebar }) => {
  return (
    <div className=" w-full text-[#D3CFDD] text-[13px] font-medium px-6 background">
      <div className="bg-transparent h-20 pb-0 flex  lg:justify-center items-center align-middle">
        <div
          className="lg:hidden absolute cursor-pointer rounded-r-lg bg-stone-900 p-4 h-12 mt-4 left-0"
          onClick={toggleSidebar}
        >
          <FaBars color={"#D3CFDD"} size={20} className="" />
        </div>
        <nav className="flex lg:justify-start justify-center gap-2 w-full rounded-lg">
          <div className="flex justify-start items-center align-middle px-4 ">
            <Link href={`/`}>
              <Image
                src="/img/logo.png"
                width={140}
                height={82}
                alt="Company Logo"
              />
            </Link>
          </div>
          <div className="lg:hidden  flex mx-1 py-10 grow justify-end ">
          {/* <ConnectButton label="CONNECT WALLET" accountStatus="address" chainStatus="icon" showBalance={false} /> */}
          <WalletConnectButton/>
          </div>
          <div className="hidden  mx-1 py-10 lg:flex grow justify-end items-center gap-4 ">
          <WalletConnectButton/>
          {/* <ConnectButton label="CONNECT WALLET" accountStatus="address" chainStatus="icon" showBalance={false} /> */}
              
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
