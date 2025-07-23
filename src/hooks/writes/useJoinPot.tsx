import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  Address,
} from 'wagmi'
import { raffleABI } from '@/generated'
import { useContext, useEffect, useState } from 'react'
import {
  ModalContext,
  TransactionStatus
} from "@/component/modal/TransactionStatusModal"
import TransactionStatusModal from "@/component/modal/TransactionStatusModal"


export function useJoinPot(
  potAddress: Address,
  amount: bigint,
  round: bigint,
  ) {
  const premintConfig = {
    address: potAddress,
    abi: raffleABI,
  }
  const { updateStatus } = useContext(ModalContext)

  const { config, error: prepareError, refetch: refetchSimulator } = usePrepareContractWrite({
    ...premintConfig,
    functionName: 'enterRound',
    args: [amount, round],
  })

  const regex = /reason:(.*?)\r?\n(.*?)(?=\r?\n|$)/s;
  const match = prepareError?.toString().match(regex)
  let errorMessage = null
  if (match) {
    errorMessage = match[2].trim()
  }

  const { write, data } = useContractWrite({
    ...config,
    onSuccess(data) {
      console.debug('Successfully written (mint whitelist)')
      updateStatus(TransactionStatus.AwaitingConfirmation)
    },
    onError(error) {
      console.debug(error)
      updateStatus(TransactionStatus.RejectedSignature)
    },
  })

  useWaitForTransaction({
    hash: data?.hash,
    confirmations: 1,
    onError() {
      console.debug('Transaction failed (mint whitelist)')
      updateStatus(TransactionStatus.Failed)
    },
    onSuccess() {
      console.debug('Transaction confirmed (mint whitelist)')
      updateStatus(TransactionStatus.Success)
    },
  })

  const execute = async () => {
    if (write) {
      updateStatus(TransactionStatus.AwaitingSignature)
      console.log("writing")
      write()
    }
  }

  return { execute, errorMessage, refetchSimulator }
}
