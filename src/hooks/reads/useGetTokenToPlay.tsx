import { raffleABI } from "@/generated";
import { useEffect, useState } from "react";
import { Address, erc20ABI, useAccount, useContractRead } from "wagmi";


export function useGetTokenToPlay(address: Address, isDisconnected: boolean) : {tokenToPlay: Address | undefined} {
  
  const [tokenToPlay, setTokenToPlay] = useState<Address>()

  const raffleConfig = {
    address: address,
    abi: raffleABI
  }
  const enabled = !isDisconnected;
  useContractRead({
    enabled: enabled,
    functionName: "tokenToPlay",
    ...raffleConfig,
    watch: false,
    onSuccess(tokenToPlay) {
        setTokenToPlay(tokenToPlay)
        console.log("token")
    },
  })

  return { tokenToPlay }
}