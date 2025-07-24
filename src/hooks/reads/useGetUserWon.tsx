// src/hooks/reads/useGetUserWon.ts
// import { raffleABI } from "@/generated";
import { useState, useEffect } from "react";
import { Address, useContractRead } from "wagmi";
import { parseAbi } from "viem";
const raffleABI = parseAbi([
  "function didPlayerWin(address player, uint256 round) view returns (bool)"
]);


export function useGetUserWon(
  potAddress: Address,
  userAddress: Address,
  round: bigint,
  isDisconnected: boolean
): { userWon: boolean | undefined } {
  const [userWon, setUserWon] = useState<boolean>();

  const raffleConfig = {
    address: potAddress,
    abi: raffleABI,
  };

  const enabled = !isDisconnected && !!potAddress && !!userAddress && round !== undefined;

  const { data, isSuccess, isError } = useContractRead({
    ...raffleConfig,
    enabled,
    functionName: "didPlayerWin",
    args: [userAddress, round],
    watch: false, // you likely only want this to run once when round ends
    onSuccess(data) {
      setUserWon(data);
      console.log("✅ User won round:", data);
    },
    onError(err) {
      console.warn("❌ Failed to check user win status", err);
    },
  });

  return { userWon };
}
