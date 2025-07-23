import { Space_Grotesk } from "next/font/google";
import Header from "./Header/Header";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";

const inter = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (

      <div className={`${inter.className} bg-[#09080C]`}>
        <div
          className="w-full min-h-screen bg-center bg-no-repeat bg-cover overflow-hidden"
          style={{ backgroundImage: "url('/img/background.svg')" }}
          >
          
          <Header toggleSidebar={toggleSidebar} />
          <div className="flex flex-row gap-4">
            {isSidebarOpen ? (
              <>
                <Sidebar
                  className="w-1/4 hidden lg:block"
                  toggleSidebar={toggleSidebar}
                />

                <div className="lg:w-3/4 w-11/12 mx-4 lg:mr-4 mt-4">
                  {children}
                </div>
              </>
            ) : (
              <>
                <Sidebar
                  className="lg:hidden block w-4/5 absolute z-10"
                  toggleSidebar={toggleSidebar}
                />
                <div
                  className="lg:block hidden cursor-pointer rounded-r-lg bg-stone-900 p-4 h-12 mt-2"
                  onClick={toggleSidebar}
                >
                  <FaBars color={"#D3CFDD"} size={20} className="" />
                </div>
                <div className="w-full lg:mx-4 mt-4">{children}</div>
              </>
            )}
          </div>
        </div>
      </div>
  
  );
};

export default RootLayout;
