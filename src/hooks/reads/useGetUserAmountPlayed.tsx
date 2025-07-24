// import { raffleABI } from "@/generated";
import { useEffect, useState } from "react";
import { Address, erc20ABI, useAccount, useContractRead } from "wagmi";
import { parseAbi } from "viem";

const raffleABI = parseAbi([
  "function getPlayerInfo(address player, uint256 round) view returns (uint256, uint256[])"
]);


export function useGetUserAmountPlayed(potAddress: Address, userAddress: Address, currentRound: bigint, isDisconnected: boolean): {userAmountPlayed : bigint | undefined} 
{
  const [userAmountPlayed, setUserAmountPlayed] = useState<bigint>()

  const raffleConfig = {
    address: potAddress,
    abi: raffleABI
  }
  const enabled = !isDisconnected;

  const request = useContractRead({
    enabled: enabled,
    functionName: "getPlayerInfo",
    ...raffleConfig,
    watch: true,
    args: [userAddress, currentRound],
    onSuccess(data) {

      setUserAmountPlayed(data[0])
        // console.log("success")
    },
  })
  

  return { userAmountPlayed }
}