"use client"

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";
import BlockSkeleton from "./block-skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const ToggleTheme = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-full aspect-square">
        <BlockSkeleton />
      </div>
      )
  }

  const svg_size = 20

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="h-full">
          <div className="flex items-center justify-center h-full aspect-square hover:bg-muted rounded border border-border"
            onClick={() => {
              (theme === "light")?
                setTheme("dark") : (theme === "dark")?
                  setTheme("system") : setTheme("light")
          }}>
            {(theme === "light")?
              <Sun size={svg_size} /> : (theme === "dark")?
                <Moon size={svg_size} /> : <Monitor size={svg_size} />}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle between themes</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ToggleTheme;
