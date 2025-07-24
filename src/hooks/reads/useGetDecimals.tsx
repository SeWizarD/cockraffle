import { tokenABI } from "@/generated";
import { useEffect, useState } from "react";
import { Address, erc20ABI, useAccount, useContractRead } from "wagmi";


export function useGetDecimals(tokenAddress: Address, isDisconnected:boolean) : {decimals: bigint | undefined} {
  const [decimals, setDecimals] = useState<bigint>()

  const tokenConfig = {
    address: tokenAddress,
    abi: tokenABI
  }
  const enabled = !isDisconnected;
  useContractRead({
    enabled: enabled,
    functionName: "decimals",
    ...tokenConfig,
    watch: false,
    onSuccess(decimals) {
        setDecimals(BigInt(decimals))
        console.log("decimals")
    },
  })

  return { decimals }
}