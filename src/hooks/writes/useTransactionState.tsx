import { useState, useEffect } from "react";
import { useWaitForTransaction } from "wagmi";

export enum TxState {
  Init,
  UserSigRequested,
  UserSigRejected,
  TxFailed,
  TxPending,
  TxConfirmed
}

interface IUseContractWrite {
  data: any | undefined;
  error: Error | null;
  isError: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  reset: () => void;
  status: string
  variables: any | undefined;
  write: (() => void) | undefined;
  writeAsync: (() => Promise<any>) | undefined;
}

export function useTransactionState(contractWrite: IUseContractWrite) {
  const [state, setState] = useState<TxState>(TxState.Init);
  const [error, setError] = useState<Error | null>(null);

  const {
    isLoading: isSigRequested,
    isSuccess: isSigSubmitted,
    isError: isSigRejected,
    error: sigError
  } = contractWrite;

  const { 
    isLoading: isPending,
    isSuccess: isConfirmed,
    isError: isTxError,
    error: txError
  } = useWaitForTransaction({
    hash: contractWrite.data?.hash
  });

  useEffect(() => {
    if (isSigRequested) {
      setState(TxState.UserSigRequested);
    } else if (isSigRejected) {
      setState(TxState.UserSigRejected);
    } else if (isPending) {
      setState(TxState.TxPending);
    } else if (isConfirmed) {
      setState(TxState.TxConfirmed);
    } else if (isTxError) {
      setState(TxState.TxFailed);
    }

    // Update the 'error' state based on the error values
    setError(sigError || txError || null);
  }, [
    isSigRequested,
    isSigRejected, 
    isPending, 
    isConfirmed, 
    isTxError, 
    sigError, 
    txError
  ]);

  return { state, error };
}

