import { tokenABI } from "@/generated";
import { formatAmountTokens } from "@/utils/formater";
import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { Address, erc20ABI, useAccount, useContractRead } from "wagmi";


export async function asyncDecimals(tokenAddress: Address, userAddress: Address, decimals: number, setDecimals: Dispatch<SetStateAction<number | undefined>>, balance: number, setBalance:  Dispatch<SetStateAction<number | undefined>>, isDisconnected:boolean) {
    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
        }
  const tokenConfig = {
    address: tokenAddress,
    abi: tokenABI
  }
  const enabled = !isDisconnected;
  let read =  useContractRead({
    enabled: enabled,
    functionName: "decimals",
    ...tokenConfig,
    watch: false,
    onSuccess(decimals: number) {
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