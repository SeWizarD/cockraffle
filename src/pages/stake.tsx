import RootLayout from "@/component/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/component/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const Stake = () => {
	return (
		<RootLayout>
			<div className="lg:w-1/3 w-4/5 h-1/2 absolute inset-0 m-auto flex flex-col justify-center items-center bg-stone-900 bg-opacity-60 rounded-lg">
				<div className="2xl:scale-125">

				
				<Tabs defaultValue="stake_lp">
					<TabsList>
						<TabsTrigger value="stake_lp" className="text-gray-300">
							STAKE LP
						</TabsTrigger>
						<TabsTrigger value="stake_token" className="text-gray-300">
							STAKE TOKEN
						</TabsTrigger>
					</TabsList>
					<TabsContent value="stake_lp" className="text-white">
						<div className="flex flex-col mt-10">
							<div className="flex flex-row pr-4 justify-center align-middle items-center lg:w-96 w-64 h-14 bg-stone-800 rounded-2xl border border-stone-800">
								<input
									type="text"
									placeholder="0.00"
									className="w-full pl-4 lg:w-96 text-white outline-none h-14 bg-stone-800 rounded-2xl border border-stone-800 placeholder:text-neutral-300 placeholder:text-lg placeholder:font-semibold"
								></input>
								<Image src={"/img/icon.png"} width={40} height={24} alt="" />
							</div>
							<div className="flex flex-row gap-4 items-center">
								<p>
									<span className="text-neutral-400 text-xs font-normal leading-tight tracking-wide">
										Balance:
									</span>
									<span className="text-white text-xs font-normal leading-tight tracking-wide">
										{" "}
										120 LPTokens
									</span>
								</p>
								<p className="hover:scale-102 active:scale-100w-16 text-red-800 text-xs font-medium leading-tight tracking-wide">
									Maximum
								</p>
							</div>
							<div className="hover:scale-102 active:scale-100 mx-auto mt-10 flex flex-row justify-center items-center">
								<BsArrowRight color={"#900707"} />
								<div className="text-red-800 text-xs font-normal leading-tight tracking-wide">
									Stake Tokens at QuickSwap
								</div>
							</div>
							<Link href="#" className="mx-auto mt-5">
								<div className="hover:scale-102 active:scale-100 flex flex-row items-center w-40 h-8 active">
									<div className="w-full text-gray-300 text-md text-center font-medium leading-tight tracking-wide">
										STAKE LP
									</div>
								</div>
							</Link>
						</div>
					</TabsContent>
					<TabsContent value="stake_token" className="text-white">
						<div className="flex flex-col mt-10">
							<div className="flex flex-row pr-4 justify-center align-middle items-center lg:w-96 w-64 h-14 bg-stone-800 rounded-2xl border border-stone-800">
								<input
									type="text"
									placeholder="0.00"
									className="w-full pl-4 lg:w-96 text-white outline-none h-14 bg-stone-800 rounded-2xl border border-stone-800 placeholder:text-neutral-300 placeholder:text-lg placeholder:font-semibold"
								></input>
								<Image src={"/img/icon.png"} width={40} height={24} alt="" />
							</div>
							<div className="flex flex-row gap-4 items-center">
								<p>
									<span className="text-neutral-400 text-xs font-normal leading-tight tracking-wide">
										Balance:
									</span>
									<span className="text-white text-xs font-normal leading-tight tracking-wide">
										{" "}
										120 LPTokens
									</span>
								</p>
								<p className="hover:scale-102 active:scale-100 w-16 text-red-800 text-xs font-medium leading-tight tracking-wide">
									Maximum
								</p>
							</div>
							<div className="hover:scale-102 active:scale-100 mx-auto mt-10 flex flex-row justify-center items-center">
								<BsArrowRight color={"#900707"} />
								<div className="text-red-800 text-xs font-normal leading-tight tracking-wide">
									Stake Lp at QuickSwap
								</div>
							</div>
							<Link href="#" className="mx-auto mt-5">
								<div className="hover:scale-102 active:scale-100 flex flex-row items-center w-40 h-8 active">
									<div className="w-full text-gray-300 text-md text-center font-medium leading-tight tracking-wide">
										STAKE TOKEN
									</div>
								</div>
							</Link>
						</div>
					</TabsContent>
				</Tabs>
				</div>
			</div>
		</RootLayout>
	);
};

export default Stake;
