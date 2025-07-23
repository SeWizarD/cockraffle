import Image from 'next/image'
import BugLogo from "../../../public/img/logo.png"
import CloseIcon from '../../../public/img/xmark-small.svg'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Backdrop from "./Backdrop";

interface TransactionStatusModalProps {
  children: ReactNode
}

export enum TransactionStatus {
  Init,
  AwaitingSignature,
  RejectedSignature,
  AwaitingConfirmation,
  Failed,
  Success,
}

const _header_: string[] = [
  'Transaction was initialised',
  'Please sign the transaction to continue...',
  'You rejected to sign the transaction',
  'Waiting for blockchain confirmation...',
  'Transaction has failed',
  'Transaction was successful',
  'Transaction has been sped up',
]

const _description_: string[] = [
  'We are trying to launch your wallet to perform the transaction.',
  'This action requires you to sign the transaction.',
  'Your wallet has rejected to sign this transaction. We have cancelled the execution of this process.',
  'We have sent your transaction to the blockchain. We are now awaiting settlement of the transaction.',
  'Unfortunately, your transaction has failed. Possible reasons: mismatch of transaction criteria, gas limit reached and more.',
  'Amazing, your transaction has been confirmed to be successful.',
  'Yes',
]

interface ITransactionStatusContext {
  state: TransactionStatus
  updateStatus: (status: TransactionStatus) => void
}

export const ModalContext = createContext<ITransactionStatusContext>({
  state: TransactionStatus.Init,
  updateStatus: () => {},
})

export default function TransactionStatusModal({
  children,
}: TransactionStatusModalProps) {
  const [visible, setVisible] = useState<boolean>(false)
  const [state, setState] = useState<TransactionStatus>(TransactionStatus.Init)

  const updateStatus = (status: TransactionStatus): void => {
    if (!visible) {
      console.log("setting visible")
      setVisible(true)
    }
    console.log(`[log] State change from '${state}' to '${status}'`)
    setState(status)
  }

  const close = () => {
    console.log('[log] Closed')
    setVisible(false)
  }

  // Automatically close if successful
  useEffect(() => {
    if (
      [
        TransactionStatus.Success,
        TransactionStatus.RejectedSignature,
        TransactionStatus.Failed,
      ].includes(state)
    ) {
      setTimeout(() => {
        console.log('handleClose()')
        close()
      }, 2000)
    }
  }, [state])

  return (
    <ModalContext.Provider value={{ state, updateStatus }}>
      <AnimatePresence>
        {visible && (
          <Backdrop onClick={() => close()}>
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1F1A1AA6] border max-w-[380px] text-[#D3CFDD] font-satoshi-medium rounded-2xl border border-stone-800 text-center relative overflow-hidden"
            >
              <Image
                src={CloseIcon}
                height={24}
                width={24}
                alt={'x'}
                className="absolute right-[8px] top-[8px] cursor-pointer"
                onClick={() => close()}
              />

              <div className="mx-8 my-12">
                <Image
                  src={BugLogo}
                  width="70"
                  height="31"
                  alt="Bug Logo"
                  className="inline-block"
                />

                <h2 className="mt-4">{_header_[state]}</h2>

                <p className="text-night-400 text-sm mt-1">
                  {_description_[state]}
                </p>
              </div>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
      {children}
    </ModalContext.Provider>
  )
}
