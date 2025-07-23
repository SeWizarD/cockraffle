import RootLayout from "@/component/layout";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/component/ui/table";
import { FaBitcoin } from "react-icons/fa6";

const tableData = [
	{
		row1: "BTC",
		row2: "Round #100",
		row3: "20 BTC",
		row4: "20 BTC",
		row5: "5min",
	},
	{
		row1: "BTC",
		row2: "Round #100",
		row3: "20 BTC",
		row4: "20 BTC",
		row5: "5min",
	},
	{
		row1: "BTC",
		row2: "Round #100",
		row3: "20 BTC",
		row4: "20 BTC",
		row5: "5min",
	},
	{
		row1: "BTC",
		row2: "Round #100",
		row3: "20 BTC",
		row4: "20 BTC",
		row5: "5min",
	},
	{
		row1: "BTC",
		row2: "Round #100",
		row3: "20 BTC",
		row4: "20 BTC",
		row5: "5min",
	},
	{
		row1: "BTC",
		row2: "Round #100",
		row3: "20 BTC",
		row4: "20 BTC",
		row5: "5min",
	},
	{
		row1: "BTC",
		row2: "Round #100",
		row3: "20 BTC",
		row4: "20 BTC",
		row5: "5min",
	},
	{
		row1: "BTC",
		row2: "Round #100",
		row3: "20 BTC",
		row4: "20 BTC",
		row5: "5min",
	},
	{
		row1: "BTC",
		row2: "Round #100",
		row3: "20 BTC",
		row4: "20 BTC",
		row5: "5min",
	},
	{
		row1: "BTC",
		row2: "Round #100",
		row3: "20 BTC",
		row4: "20 BTC",
		row5: "5min",
	},
	{
		row1: "BTC",
		row2: "Round #100",
		row3: "20 BTC",
		row4: "20 BTC",
		row5: "5min",
	},
	{
		row1: "BTC",
		row2: "Round #100",
		row3: "20 BTC",
		row4: "20 BTC",
		row5: "5min",
	},
	{
		row1: "BTC",
		row2: "Round #100",
		row3: "20 BTC",
		row4: "20 BTC",
		row5: "5min",
	},
];

const Partners = () => {
	return (
		<RootLayout>
			<div className="w-full h-[85dvh] overflow-auto px-5 lg:px-10 bg-stone-900 bg-opacity-60 rounded-lg">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="text-neutral-400 text-xl text-center">
								Token
							</TableHead>
							<TableHead className="text-neutral-400 text-xl text-center">
								Rounds Played
							</TableHead>
							<TableHead className="text-neutral-400 text-xl text-center">
								PoolSize
							</TableHead>
							<TableHead className="text-neutral-400 text-xl text-center">
								Time Left
							</TableHead>
							<TableHead className="text-neutral-400 text-xl text-center">
								Round Time
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tableData.map((data, index) => (
							<TableRow key={index}>
								<TableCell className="text-gray-300 text-xl font-normal text-center">
									<div className="flex flex-row justify-center items-center gap-3">
										<FaBitcoin color={"#F7931A"} /> {data.row1}
									</div>
								</TableCell>
								<TableCell className="text-gray-300 text-xl font-normal text-center">
									{data.row2}
								</TableCell>
								<TableCell className="text-gray-300 text-xl font-normal text-center">
									{data.row3}
								</TableCell>
								<TableCell className="text-gray-300 text-xl font-normal text-center">
									{data.row4}
								</TableCell>
								<TableCell className="text-gray-300 text-xl font-normal text-center">
									{data.row5}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</RootLayout>
	);
};

export default Partners;
