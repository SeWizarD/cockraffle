import { tokenABI } from "@/generated";
import { useEffect, useState } from "react";
import { Address, erc20ABI, useAccount, useContractRead } from "wagmi";


export function useGetSymbol(tokenAddress: Address, isDisconnected: boolean) : {symbol: string | undefined} {
  const [symbol, setSymbol] = useState<string>()
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  const tokenConfig = {
    address: tokenAddress,
    abi: tokenABI
  }
  const enabled = !isDisconnected;
  const request = useContractRead({
    enabled: enabled,
    functionName: "symbol",
    ...tokenConfig,
    watch: false,
    onSuccess(symbol) {
        setSymbol(symbol)
        console.log("symbol")
    },
  })

  if(request.isError){
    if(tokenAddress != null && !isDisconnected){
      sleep(2000).then(() => {request.refetch()})
    }
  }

  return { symbol }
}