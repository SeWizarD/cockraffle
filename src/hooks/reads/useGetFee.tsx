import { raffleABI } from "@/generated";
import { useEffect, useState } from "react";
import { Address, erc20ABI, useAccount, useContractRead } from "wagmi";


export function useGetFee(address: Address, isDisconnected: boolean): {fee: bigint | undefined} {
  const [fee, setFee] = useState<bigint>()

  const raffleConfig = {
    address: address,
    abi: raffleABI
  }
  const enabled = !isDisconnected;
  useContractRead({
    enabled: enabled,
    functionName: "fee",
    ...raffleConfig,
    watch: false,
    onSuccess(fee) {
        setFee(fee)
        console.log("fee")
    },
  })

  return {fee} 
}