import { ConnectButton } from '@rainbow-me/rainbowkit'
import PolygonLogo from '../../public/images/tokens/matic.webp'
import Image from 'next/image'

interface WalletConnectButtonProps {
  label?: string
  accountStatus?: 'avatar' | 'address' | 'full'
  chainStatus?: 'icon' | 'name' | 'full' | 'none'
  showBalance?: boolean
}

export default function WalletConnectButton({
  label,
  accountStatus,
  chainStatus,
  showBalance,
}: WalletConnectButtonProps) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="hover:scale-102 active:scale-100 py-2 px-6 rounded-md font-satoshi-medium text-base bg-violet text-white"
                    type="button"
                  >
                    Connect Wallet
                  </button>
                )
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="py-2 px-6 rounded-md font-satoshi-medium bg-violet text-white"
                    type="button"
                  >
                    Switch Network
                  </button>
                )
              }

              return (
                <div className="flex items-center gap-5 ">
                  <button
                    onClick={openAccountModal}
                    className="hover:scale-105 active:scale-100 py-1 md:py-2 rounded-md text-sm md:text-base font-satoshi-medium text-white text-right"
                    type="button"
                  >
                    <div className='hover:text-white text-gray-300 '>
                    <span className="block text-xs ">
                      Wallet
                    </span>
                    <span className=' '>{account.displayName}</span>

                    </div>
                  </button>

                  {/* Only show the option to change chain in development */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className='hover:scale-105 active:scale-100 hover:text-white text-gray-300 '>

                    <button
                      onClick={openChainModal}
                      className="rounded text-sm font-satoshi-regular  py-2 px-3 transition text-right"
                      type="button"
                      >
                      {chain.name}
                      <br />
                      <span className="text-xs">Switch network</span>
                    </button>
                    </div>
                  )}
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
