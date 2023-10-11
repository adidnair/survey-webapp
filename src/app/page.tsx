import FormProvider from "@/components/form-provider";
import SurveyForm from "@/components/survey-form";
import ToggleTheme from "@/components/toggle-theme";
import { dbPromise } from "@/components/form-data";
import { ErrorBoundary } from "react-error-boundary";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex bg-background sticky top-0 border-b border-border w-screen h-16 items-center">
        <div className="flex-1"></div>
        <div className="flex w-full justify-center text-xl">Survey</div>
        <div className="flex-1"></div>
        <div className="mr-4 h-1/2">
          <ToggleTheme />
        </div>
      </div>
      <div className="mx-8 md:mx-16 lg:mx-32 py-20">
        <ErrorBoundary fallback={<div>oops!</div>}>
          <FormProvider formPromise={dbPromise}>
            <SurveyForm />
          </FormProvider>
        </ErrorBoundary>
      </div>
    </main>
  )
}
