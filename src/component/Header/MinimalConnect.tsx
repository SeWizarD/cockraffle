import { ConnectButton } from '@rainbow-me/rainbowkit'

export function MinimalConnect(){
    return(
        <ConnectButton.Custom>
        {({
            openConnectModal,
        }) =>
        { return(
            <div onClick={openConnectModal} className="w-full text-gray-300 text-lg text-center font-medium leading-tight tracking-wide cursor-pointer">
        Connect Wallet</div>
        )}}
        </ConnectButton.Custom>

    )
}