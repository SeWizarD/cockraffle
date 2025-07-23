import { tokenABI } from "@/generated";
import { formatAmountTokens } from "@/utils/formater";
import { useEffect, useState } from "react";
import { Address, erc20ABI, useAccount, useContractRead } from "wagmi";


export async function asyncDecimals(tokenAddress: Address, userAddress: Address, decimals, setDecimals, balance, setBalance, isDisconnected:boolean) {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
        }
  const tokenConfig = {
    address: tokenAddress,
    abi: tokenABI
  }
  const enabled = !isDisconnected;
  let read = useContractRead({
    enabled: enabled,
    functionName: "decimals",
    ...tokenConfig,
    watch: false,
    onSuccess(decimals) {
        setDecimals(decimals)
        console.log("balanceOf")
    },
  })

  if(read.isError){
    if(tokenAddress != null)
    sleep(2000).then(() => {read.refetch()})
  }
  
  useContractRead({
    functionName: "balanceOf",
    ...tokenConfig,
    watch: true,
    args: [userAddress],
    onSuccess(balance) {
        setBalance(Number(balance)/10**decimals)
        console.log("balanceOf")
    },
  })

}