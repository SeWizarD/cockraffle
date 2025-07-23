import { raffleABI } from "@/generated";
import { useEffect, useState } from "react";
import { Address, erc20ABI, useAccount, useContractRead } from "wagmi";


export function useGetCurrentRound(address: Address, isDisconnected: boolean) {
  const [currentRound, setCurrentRound] = useState<bigint>()

  const raffleConfig = {
    address: address,
    abi: raffleABI
  }
  const enabled = !isDisconnected;
  useContractRead({
    enabled: enabled,
    functionName: "currentRound",
    ...raffleConfig,
    watch: true,
    onSuccess(currentRound) {
        setCurrentRound(currentRound)
        // console.log("success")
    },
  })

  return { currentRound }
}