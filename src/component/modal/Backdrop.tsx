import { ReactElement, MouseEvent } from "react"
import { motion } from "framer-motion"

interface OverlayProps {
  children: ReactElement | string,
  onClick: (event: MouseEvent<HTMLDivElement>) => void
}

export default function Overlay({children, onClick}: OverlayProps) {
  return (
    <motion.div 
      onClick={onClick} 
      className="z-20 absolute flex items-center justify-center w-screen h-screen bg-night-900/80 backdrop-blur-md overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}