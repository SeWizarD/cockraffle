import { tokenABI } from "@/generated";
import { useEffect, useState } from "react";
import { Address, erc20ABI, useAccount, useContractRead } from "wagmi";


export function useGetBalance(tokenAddress: Address, userAddress: Address, isDisconnected: boolean) : {balance: bigint | undefined} {
  const [balance, setBalance] = useState<bigint>()

  const tokenConfig = {
    address: tokenAddress,
    abi: tokenABI
  }
  const enabled = !isDisconnected;
  useContractRead({
    enabled: enabled,
    functionName: "balanceOf",
    ...tokenConfig,
    watch: true,
    args: [userAddress],
    onSuccess(balance) {
        setBalance(balance)
        console.log("balanceOf")
    },
  })

  return { balance }
}