import {
    Address,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
  } from 'wagmi'
  import { tokenABI } from '@/generated'
  import { useContext, useEffect } from 'react'
  import {
    TransactionStatus,
    ModalContext,
  } from "@/component/modal/TransactionStatusModal";
  
  
  
  export function useApproveTokenAmount(tokenAddress: Address, potAddress: Address, tokenAmount: bigint, refetchSimulator) {
    const tokenConfig = {
        address: tokenAddress as `0x${string}`,
        abi: tokenABI,
    }
    const { updateStatus } = useContext(ModalContext)
  
    const { config } = usePrepareContractWrite({
      ...tokenConfig,
      functionName: 'approve',
      args: [potAddress, tokenAmount],
      onSuccess() {
        console.log('Success prepare (approve token amount)')
      },
      onError() {
        console.log('Failed prepare (approve token amount)')
      },
    })
  
    const { write, data } = useContractWrite({
      ...config,
      onSuccess(data) {
        updateStatus(TransactionStatus.AwaitingConfirmation)
        console.log('Successfully written (approve token amount)')
    },
    onError(error) {
        console.log('Error writing (approve token amount)')
        updateStatus(TransactionStatus.RejectedSignature)
        console.log(error)
      },
    })
  
    // const p = new Promise() 
    useWaitForTransaction({
      hash: data?.hash,
      confirmations: 1,
      onError() {
        console.log('Transaction failed (approve token amount)')
        updateStatus(TransactionStatus.Failed)
      },
      onSuccess() {
        console.log('Transaction confirmed (approve token amount)')
        updateStatus(TransactionStatus.Success)
        refetchSimulator()
      },
    })
  
    const execute = async () => {
      if (write) {
        updateStatus(TransactionStatus.AwaitingSignature)
        
        console.log('Executing write (approve token amount)')
        write()
        
      }
    }
  
    return {
      approveTokenAmount: execute,
    }
  }
  