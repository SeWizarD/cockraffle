import { ReactNode, useState } from 'react'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
}

export default function Tooltip({ children, content }: TooltipProps) {
  const [visible, setVisible] = useState<boolean>(false)

  const handleMouseEnter = () => {
    setVisible(true)
  }

  const handleMouseLeave = () => {
    setVisible(false)
  }

  return (
    <div
      className="relative inline-block"
      onPointerEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
    >
      {children}
      {visible && (
        <div className="fixed outset mt-4 z-50 bg-background/20 backdrop-blur-sm animate-in fade-out-0 absolute top-100 left-50 bg- backdrop-opacity-10 text-white p-2 rounded text-[14px] z-[99]">
          {content}
        </div>
      )}
    </div>
  )
}
