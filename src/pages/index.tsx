import Image from "next/image";
import RootLayout from "@/component/layout";
import { useRouter } from 'next/router'
import { Address, useAccount, useWalletClient, useBlockNumber } from 'wagmi'
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/component/ui/dialog";
import WinnerCard from "@/component/WinnerCard";
import { useGetCurrentRound } from "@/hooks/reads/useGetCurrentRound";
import { useGetFee } from "@/hooks/reads/useGetFee";
import { useBlock } from "@/hooks/reads/useBlock";
import { Underdog } from "next/font/google";
import { formatAmountTokens } from "@/utils/formater";
import { useGetTokenToPlay } from "@/hooks/reads/useGetTokenToPlay";
import { useGetallowance } from "@/hooks/reads/useGetAllowance";
import { useGetBalance } from "@/hooks/reads/useGetBalance";
import { useGetDecimals } from "@/hooks/reads/useGetDecimals";
import { asyncDecimals } from "@/hooks/reads/asyncDecimals";
import useCountdown from "@/hooks/reads/useCountdown";
import { useGetRoundById } from "@/hooks/reads/useGetRoundById";
import { timeStamp } from "console";
import { useGetUserAmountPlayed } from "@/hooks/reads/useGetUserAmountPlayed";
import Tooltip from "@/utils/Tooltip";
import { useApproveTokenAmount } from "@/hooks/writes/useApproveTokenAmount";
import TransactionStatusModal from "@/component/modal/TransactionStatusModal";
import { useJoinPot } from "@/hooks/writes/useJoinPot";
import { MinimalConnect } from "@/component/Header/minimalConnect";
import { join } from "path";
import { useGetSymbol } from "@/hooks/reads/useGetSymbol";
const skills = [90, 60, 40, 20];

export default function Home() {
  const router = useRouter();
  const [potAddress, setPotAddress] = useState(router.query.pot);
  const [userAmountPlayed, setUserAmountPlayed] = useState<bigint>();
  const [tokenSymbol, setTokenSymbol] = useState<string>();
  const [totalAmountPlayed, setTotalAmountPlayed] = useState<bigint>();
  const [countdownTimeStamp, setCountdownTimeStamp] = useState<{timeStamp : bigint; roundSet: number }>();
  const [fee, setFee] = useState<number>(0);
  const [balance, setBalance] = useState<String>();
  const [decimals, setDecimals] = useState<Number>();
  const [allowance, setAllowance] = useState<bigint>();
  const [tokenToPlay, setTokenToPlay] = useState<Address>();
  const [blockNumber, setBlockNumber] = useState<bigint>();
  const [currentRound, setCurrentRound] = useState<bigint>();
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentSkill, setCurrentSkill] = useState(0);
  const [barPercent, setBarPercent] = useState(1);
  const [progress, setProgress] = useState(1);
  const [barProgress, setbarProgress] = useState(1);
  const circumference = 2 * (22 / 7) * 120;
  const[bigIntInput, setBigIntInput] = useState<bigint>(0n)
  const conversion = BigInt(1e16)

  

  const handleChange = (e) => {
    const regex =  /^\d*\.?\d*$/;
    
    if (regex.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  }
  useEffect(() => {
    const animateProgress = () => {
      if (progress < currentSkill) {
        setTimeout(() => {
          setProgress(progress + 5);
        }, 20);
      }
      if (progress < barPercent) {
        setTimeout(() => {
          setbarProgress(progress + 5);
        }, 20);
      }
    };

    animateProgress();
  }, [currentSkill, progress]);

  const {address, isConnecting, isDisconnected } = useAccount() 
  const [inputValue, setInputValue] = useState()
  function toBigInt(number:Number) {
    // Convert to string
    let str = number.toString();
    
    // Check if there is a decimal point
    const decimalIndex = str.indexOf('.');
  
    if(decimalIndex === -1) {
      // No decimal point, pad with 18 zeros
      str += '000000000000000000'; 
    } else {
      // Get fractional part and pad with zeros
      const frac = str.slice(decimalIndex + 1);
      console.log(frac.length)
      if (frac.length === 0){
        str += '000000000000000000'; 
        console.log("trying to replace")
        str = str.replace(".","")
        str = str.slice(0, decimalIndex) + str.slice(decimalIndex, decimalIndex+18);
      }else{
        str = str.slice(0, decimalIndex) + frac +'000000000000000000';
        console.log(str)
        // Take first 18 characters of padded fractional part
        str = str.slice(0, decimalIndex) + str.slice(decimalIndex, decimalIndex+18);
        console.log(str)
      }
    }
    console.log(str)
    return BigInt(str);
  }
  

  asyncDecimals(tokenToPlay, address, decimals, setDecimals, balance, setBalance, isDisconnected)
  //get the token to play 
  const { tokenToPlay: _tokenToPlay } = useGetTokenToPlay(
    potAddress as Address ,
    isDisconnected as boolean
  )
  useEffect(() => {
    if (_tokenToPlay  != undefined){
      setTokenToPlay(_tokenToPlay);
    }
    console.log("setting Token address") 
  },[_tokenToPlay]);

  //get the current Round
  const { currentRound: _currentRound } = useGetCurrentRound(
    potAddress as Address,
    isDisconnected as boolean
  )
  useEffect(() => {
    setCurrentRound(_currentRound);
    console.log("setting address") 
  },[_currentRound]);

  //get the amount a user played
  const { userAmountPlayed: _userAmountPlayed } = useGetUserAmountPlayed(
    potAddress as Address,
    address as Address,
    currentRound as bigint,
    isDisconnected as boolean
  )
  useEffect(() => {
    setUserAmountPlayed(_userAmountPlayed);
    console.log("setting userAmountPlayed") 
  },[_userAmountPlayed]);
  
  
  useEffect(() => {
    if(totalAmountPlayed && userAmountPlayed){
      setCurrentSkill(Math.floor(Number(userAmountPlayed)/Number(totalAmountPlayed)*10000)/100)
    }else{
      // setProgress(0)
      if(totalAmountPlayed === 0){
        setCurrentSkill(0)
      }
    }
  },[_userAmountPlayed, totalAmountPlayed]);

  

  //get the users allowance
  const { allowance: _allowance } = useGetallowance(
    tokenToPlay as Address,
    address as Address,
    potAddress as Address,
    isDisconnected as boolean

  )
  useEffect(() => {
    if (_allowance  != undefined){
      setAllowance(_allowance);
      console.log("allowance set as %s", allowance) 
    }
  },[_allowance]);
  


  const { fee: _fee } = useGetFee(
    potAddress as Address,
    isDisconnected as boolean
  )
  useEffect(() => {
    if (_fee  != undefined){
      let newFee = Number(_fee/BigInt(1e15));
      setFee(newFee/10);
      console.log(formatAmountTokens(Number(_fee)));
      console.log("setting fee") 
    }
  },[_fee]);
  
  const { symbol: _symbol } = useGetSymbol(
    tokenToPlay as Address,
    isDisconnected as boolean
  )
  useEffect(() => {
    if (_symbol  != undefined){
      setTokenSymbol(_symbol)
      console.log("setting tokenSymbol") 
    }
  },[_symbol]);
  
  useEffect(() => {if(potAddress != ""){
    setPotAddress("0x2Fc3caF1207c3BDE383B2CfcA2F53241230c20F6"); //mainpot
  }},[router]);


  const { roundById:_roundById } = useGetRoundById(potAddress, currentRound, isDisconnected)
  
  const {
    execute: joinPot,
    errorMessage: prepareError,
    refetchSimulator,
  } = useJoinPot(
    potAddress as Address,
    bigIntInput as bigint,  
    currentRound as bigint
  )
  const {approveTokenAmount: execute} = useApproveTokenAmount(tokenToPlay,potAddress,bigIntInput, refetchSimulator);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    console.log(decimals)
    console.log(allowance)
    // console.log(BigInt(inputValue*10**decimals))
    if(bigIntInput > allowance){
      console.log("we are here");
      execute();
    } else{
      console.log("joining pot");
      joinPot();
    }
  }
  useEffect(() => {
    if(inputValue != undefined){

        setBigIntInput(toBigInt(inputValue));
    }
  },[inputValue]);
  useEffect(() => {
    if (_roundById  != undefined){
      // setAllowance(_allowance);
      if (countdownTimeStamp?.roundSet != currentRound && _roundById.endTimeStamp != undefined){
        const newCountdownTimestamp = {timeStamp:_roundById.endTimeStamp, currentRound: currentRound}
        setCountdownTimeStamp(newCountdownTimestamp)
        setTotalAmountPlayed(_roundById.tokensPlayed)
        console.log("totalAmount played: %s", totalAmountPlayed)
        // console.log(newCountdownTimestamp.currentRound)
        // console.log("Timestamp", newCountdownTimestamp.timeStamp)
        // console.log("Timestamp og", _roundById.endTimeStamp)
      } 
      // console.log("allowance set as %s", allowance) 
    }
  },[_roundById]);
  const [newDate, setNewDate] = useState<Date>();
  const [roundState, setRoundState] = useState<string>();

  const potAmountDisplay = (formatAmountTokens(Number(totalAmountPlayed)/1e18, "B") + " " + tokenSymbol)
  const userAmountDisplay = (formatAmountTokens(Number(userAmountPlayed)/1e18, "B") +" " + tokenSymbol)
  useEffect(() => {
    if(countdownTimeStamp?.timeStamp != undefined){
        console.log("setting time")

        setNewDate(new Date(Number(countdownTimeStamp.timeStamp)*1000));
    }
  },[countdownTimeStamp]);
  
  useEffect(() => {
    if(countdownTimeStamp?.timeStamp != undefined){
        console.log("setting time")
        if (countdownTimeStamp.timeStamp == BigInt(60)){
          setRoundState("waiting")
        }
        else if (countdownTimeStamp.timeStamp != BigInt(60) && !(d == "00" && h == "00" && min == "00" && sec == "00")){
          setRoundState("countdown")
        }else{
          setRoundState("ending")
        }

        setNewDate(new Date(Number(countdownTimeStamp.timeStamp)*1000));
    }
  },[countdownTimeStamp]);
  

  
  // const newDate = new Date(Number(countdownTimeStamp?.timeStamp))
  const { d, h, min, sec, ms } = useCountdown(newDate)
 
  return (
    <RootLayout>

      <div className="flex lg:flex-row flex-col gap-4">
        <div className="lg:w-2/3 w-full sm:mb-10  min-h-[20rem] 2xl:max-h-[50rem] max-h-[33.5rem] lg:p-4 bg-stone-900 bg-opacity-60 rounded-lg">
          <div className="2xl:scale-100 scale-95">
          <div className="lg:mt-0 mt-5 text-gray-300 text-xl text-center font-bold leading-tight tracking-wide">
            MATIC Main Pot - 1 min
            {/* {address} */}
            {/* {allowance?.toString()} */}
          </div>
          <div className="flex flex-col  mt-5">
            <div className="px-5 gap-2 flex flex-row justify-between">
              <Tooltip content="The amount you entered with">
                <div className="w-36 2xl:h-10 h-8 bg-stone-800 rounded-2xl flex flex-col items-center justify-center">
                    <div className="text-gray-300 text-base  text-center font-medium leading-tight tracking-wide">
                      {userAmountDisplay}
                    </div>
                </div>    
              </Tooltip>
              <Tooltip content="This is your Chance of winning"> 
                <div className="w-36 2xl:h-10 h-8 bg-stone-800 rounded-2xl flex flex-col items-center justify-center">
                    <div className="text-gray-300 text-base  text-center font-medium leading-tight tracking-wide">
                      Chance {currentSkill} %
                    </div>
                </div>
              </Tooltip>
            </div>

            <div className="flex items-center justify-center w-full">
              <div className="2xl:mt-20 2xl:mb-20 absolute text-white font-grotesk">
                {totalAmountPlayed ?  potAmountDisplay : <>
                Enter to start  
                <div className="text-center">round</div>
              </>}
              </div>
              <svg
                className="2xl:scale-125 2xl:mt-20 2xl:mb-20 transform -rotate-90 "
                viewBox="0 0 290 290"
                style={{
                  maxWidth:"300px"
                }}
                >
                <circle
                  cx="145"
                  cy="145"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="25"
                  fill="transparent"
                  className="text-[#292323]"
                  />
                 {/* <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="absolute inset-0 flex items-center justify-center text-white">
                Overlay Text
              </text> */}
                <circle
                  cx="145"
                  cy="145"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="25"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={
                    circumference - (progress / 100) * circumference
                  }
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-800 transition-all duration-500 ease-in-out"
                  />
              </svg>
            </div>

            <div className="px-5 gap-2 flex flex-row justify-between">
              <div className="w-36 2xl:h-10 h-8 bg-stone-800 rounded-2xl flex flex-col items-center justify-center">
                <div className="text-gray-300 text-base  text-center font-medium leading-tight tracking-wide">
                  Round {currentRound?.toString()}  
                </div>
              </div>
              <div className="w-36 2xl:h-10 h-8 bg-stone-800 rounded-2xl flex flex-col items-center justify-center">
                <div className=" text-gray-300 text-base  text-center font-medium leading-tight tracking-wide">
                  {(fee).toString()}% Fee
                </div>
              </div>
            </div>

            {roundState == "waiting" && <div className="w-full flex-row text-gray-300 mt-2 text-lg text-center font-medium leading-tight tracking-wide animate-pulse ">
            Waiting for 2 Entries ...
          </div>
            }
            {//when the timestamp is already giving and the time is over (winner is being drawn)
            roundState == "ending" &&
            <div className="w-full flex-row text-gray-300 mt-2 text-lg text-center font-medium leading-tight tracking-wide animate-pulse ">
              Calculating Results ...
            </div>}
            {
            roundState == "countdown" &&
            <div className="w-full text-gray-300 mt-2 text-lg text-center font-medium leading-tight tracking-wide cursor-pointer">
              <div className="inline-block bg-night-700 px-[8px] py-[5px] rounded-[5px]">
                    {min} min
              </div>
              <div className="inline-block bg-night-700 px-[8px] py-[5px] rounded-[5px]">
                    {sec} sec
              </div>
              <div className="inline-block bg-night-700 px-[8px] py-[5px] rounded-[5px]">
                    {ms} ms
              </div>
            </div>
            
            }
            <div className="mx-auto mt-8 mb-0 pb-5">
              <Dialog>
                <div className="hover:scale-102 active:scale-100 flex flex-row items-center w-[35dvw] md:w-52 h-9 2xl:h-12 2xl:w- active">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="justify-center align-middle items-center w-full">
                        {isDisconnected? 
                        <MinimalConnect/>
                        :
                        (Number(allowance) == 0 ? <div className="w-full text-gray-300 text-lg text-center font-medium leading-tight tracking-wide cursor-pointer">
                          APPROVE TOKEN
                        </div>
                        :
                        <div className="w-full text-gray-300 text-lg text-center font-medium leading-tight tracking-wide cursor-pointer">
                        PLAY
                        </div>)}
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <div className="mx-auto">
                          <DialogTitle>Enter an Amount to play</DialogTitle>
                        </div>
                      </DialogHeader>
                      <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mt-10">
                          <div className="flex flex-row pr-4 justify-center align-middle items-center lg:w-96 w-64 h-14 bg-stone-800 rounded-2xl border border-stone-800">
                              <input
                                type="text" 
                                pattern="[0-9.]*"
                                
                                value={inputValue}
                                onChange={handleChange}
                                placeholder="0.00"
                                
                                className="text-white w-full pl-4 lg:w-96 outline-none h-14 bg-stone-800 rounded-2xl border border-stone-800 placeholder:text-neutral-300 text-lg font-semibold"
                                ></input>
                            <Image
                              src={"/img/icon.svg"}
                              width={40}
                              height={24}
                              alt=""
                              />
                          </div>
                          <div className="flex flex-row gap-4 items-center">
                            <p>
                              <span className="text-neutral-400 text-xs font-normal leading-tight tracking-wide">
                                Balance:
                              </span>
                              <span className="text-white text-xs font-normal leading-tight tracking-wide">
                                {" "}
                                {formatAmountTokens(balance)} LPTokens
                              </span>
                            </p>
                            <div onClick={() => {
                              setInputValue(balance)
                              console.log("changed")
                            }}className="cursor-pointer hover:scale-102 active:scale-100 w-16 text-red-800 text-xs font-medium leading-tight tracking-wide">
                              Maximum
                            </div>
                          </div>
                          <div className="mx-auto mt-5">
                            <div className="hover:scale-102 active:scale-100 flex flex-row items-center w-40 h-8 active">
                              {bigIntInput > allowance ? 
                              <button
                              type="submit"
                              className="w-full text-gray-300 text-md text-center font-medium leading-tight tracking-wide uppercase"
                              >
                                APPROVE
                              </button>
                              :
                              <button
                              type="submit"
                              className="w-full text-gray-300 text-md text-center font-medium leading-tight tracking-wide uppercase"
                              >
                                PLAY
                              </button>
                              }
                            </div>
                          </div>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </Dialog>
            </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 w-full flex flex-col gap-4">
          <WinnerCard barProgress={20} tokenAmount={100} address="0xAddress" percentage={20}/>
          <WinnerCard barProgress={20} tokenAmount={100} address="0xAddress" percentage={20}/>
          <WinnerCard barProgress={20} tokenAmount={100} address="0xAddress" percentage={20}/>
          <WinnerCard address="Check the Explorer to see more" />
        </div>
      </div>
    
    </RootLayout>
  );
}
