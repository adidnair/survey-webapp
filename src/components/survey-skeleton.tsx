import { cn } from "@/lib/utils"
import { Separator } from "./ui/separator"

const InputPlaceholder = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-40 bg-muted rounded text-sm text-muted">a</div>
      <div className="w-80 h-10 bg-muted rounded"></div>
      <div className="w-3/4 bg-muted rounded text-sm text-muted">a</div>
    </div>
  )
}

const InputPlaceholder2 = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-20 bg-muted rounded text-sm text-muted">a</div>
      <div className="w-80 h-10 bg-muted rounded"></div>
      <div className="w-1/4 bg-muted rounded text-sm text-muted">a</div>
    </div>
  )
}

const RadioPlaceholder = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-60 bg-muted rounded text-sm text-muted">a</div>
      <div className="flex flex-col gap-3">
        <div className="w-40 bg-muted rounded text-muted">a</div>
        <div className="w-40 bg-muted rounded text-muted">a</div>
        <div className="w-40 bg-muted rounded text-muted">a</div>
      </div>
      <div className="w-2/5 bg-muted rounded text-sm text-muted">a</div>
    </div>
  )
}

const SurveyFormSkeleton = () => {
  return (
    <div className="animate-pulse">
      <InputPlaceholder />
      <Separator className="my-12"/>
      <InputPlaceholder2 />
      <Separator className="my-12"/>
      <RadioPlaceholder />
      <Separator className="my-12"/>
      <InputPlaceholder />
    </div>
  )
}

export default SurveyFormSkeleton
