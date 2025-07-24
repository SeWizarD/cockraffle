import { tokenABI } from "@/generated";
import { useEffect, useState } from "react";
import { Address, erc20ABI, useAccount, useContractRead } from "wagmi";


export function useGetallowance(tokenAddress: Address, userAddress: Address, potAddress: Address, isDisconnected: boolean) : {allowance: bigint | undefined} {
  const [allowance, setAllowance] = useState<bigint>()
  const tokenConfig = {
    address: tokenAddress,
    abi: tokenABI
  }
  const enabled =  !isDisconnected;

  const request = useContractRead({
    enabled: enabled,
    functionName: "allowance",
    ...tokenConfig,
    watch: true,
    args: [userAddress, potAddress],
    onSuccess(allowance) {
        setAllowance(allowance)
        console.log("allowance")
    },
  })
  

  return { allowance }
}