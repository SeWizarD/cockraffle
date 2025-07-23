import { raffleABI } from "@/generated";
import { useEffect, useState } from "react";
import { Address, erc20ABI, useAccount, useContractRead } from "wagmi";


export function useGetRoundById(address: Address, currentRound: bigint, isDisconnected): {roundById : {
  winnerClaimed: boolean;
  winner: Address; 
  tokensPlayed: bigint;
  winnerRequest: bigint;
  startTimeStamp: bigint;
}} 
{
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const [roundById, setRoundById] = useState<{
    winnerClaimed: boolean;
    winner: Address; 
    tokensPlayed: bigint;
    winnerRequest: bigint;
    endTimeStamp: bigint;
  }>()
  const [roundDuration, setRoundDuration] = useState<bigint>()

  const raffleConfig = {
    address: address,
    abi: raffleABI
  }
  const enabled = !isDisconnected;

  const request = useContractRead({
    enabled: enabled,
    functionName: "roundDuration",
    ...raffleConfig,
    watch: false,
    onSuccess(roundDuration) {

      setRoundDuration(roundDuration)
        // console.log("success")
    },
  })

  if(request.isError){
    if(address != null && !isDisconnected){
      sleep(2000).then(() => {request.refetch()})
    }
  }
  useContractRead({
    enabled: enabled,
    functionName: "roundById",
    ...raffleConfig,
    watch: true,
    args: [currentRound],
    onSuccess(data) {
      if (roundDuration != null){

        const [winnerClaimed, winner, tokensPlayed, winnerRequest, startTimeStamp] = data;
        console.log("startTimestamp %s", startTimeStamp)
        let endTimeStamp = startTimeStamp + roundDuration
        console.log("roundDuration %s", roundDuration)
        setRoundById({      
          winnerClaimed,
          winner,
          tokensPlayed,
          winnerRequest,  
          endTimeStamp
        })
      }
        console.log("gettingRound")
    },
  })

  return { roundById }
}