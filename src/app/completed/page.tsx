import ToggleTheme from "@/components/toggle-theme";

export default function CompletedPage() {
  return (
  <div className="flex flex-col gap-16 h-screen w-screen items-center justify-center relative">
    <div className="absolute h-8 top-4 right-4">
      <ToggleTheme />
    </div>
    <div className="text-3xl text-center w-[90%] lg:text-6xl font-bold">Thank you for taking part in our survey!</div>
    <div className="text-center w-[80%] lg:w-1/2">Haha</div>
  </div>
  )
}
