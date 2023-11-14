"use client"

import ToggleTheme from "@/components/toggle-theme";
import { toast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";

export default function CompletedPage( { params }: { params: {gen_id: string} }) {
  const [siteURL, setSiteURL] = useState('')
  useEffect(() => {
    setSiteURL(window.location.href.split("/completed")[0])
    }, [])
  return (
  <div className="flex flex-col gap-16 h-screen w-screen items-center justify-center relative">
    <div className="absolute h-8 top-4 right-4">
      <ToggleTheme />
    </div>
    <div className="text-3xl text-center w-[90%] lg:text-6xl font-bold">Thank you for taking part in our survey!</div>
    <div className="text-center w-[80%] lg:w-1/2">
      Your response has been successfully submitted! We greatly appreciate you taking the time to fill out our survey.
    </div>

    {(siteURL === '') ? <div className="bg-muted text-muted px-3 py-1 w-1/3 rounded rounded-l animate-pulse">a</div> :
      <div className="text-center flex flex-col gap-4">
      Use this link to edit your submission in case you want to in the future
      <div className="flex flex-row gap-4 justify-center items-center">
        <a className="bg-muted text-muted-foreground hover:text-primary px-3 py-1 rounded rounded-l underline" href={`${siteURL}/submission/${params.gen_id}`} target="_blank">{siteURL}/submission/{params.gen_id}</a>
        <Copy className="text-muted hover:text-primary cursor-pointer" onClick={() => {
          navigator.clipboard.writeText(`${siteURL}/submission/${params.gen_id}`)
          toast({
            title: "Copied link to clipboard",
            duration: 2000
            })
        }}/>
      </div>
      </div>
    }
  </div>
  )
}
