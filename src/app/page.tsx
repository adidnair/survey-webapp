import ToggleTheme from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
  <div className="flex flex-col gap-16 h-screen w-screen items-center justify-center relative">
    <div className="absolute h-8 top-4 right-4">
      <ToggleTheme />
    </div>
    <div className="text-3xl xl:text-6xl font-bold">Computer Science Trends Survey</div>
    <div className="text-center w-1/2">This is a survey we are conducting as part of our survey lab.<br />We are collecting this data to analyze trends and patterns in the current computere science environment.<br />Any data we collect will be strictly used for this purpose only and will not be shared to anyone else or be used by us for any other purpose</div>
    <Link href="/new_survey" className="text-3xl">
      <Button >Go to survey</Button>
    </Link>
  </div>
  )
}
