import FormChoicesProvider from "@/components/form-provider";
import SurveyForm from "@/components/survey-form";
import ToggleTheme from "@/components/toggle-theme";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import SurveyFormSkeleton from "@/components/survey-skeleton";
import { getDbPromise } from "@/components/form-data";

const SurveyErrorHappened = () => {
  return (
    <div className="flex flex-col gap-6 h-full w-full text-xl text-center items-center justify-center">
      Something went wrong :/<br />
      Please try reloading the page. If it still persists, press the button below to let us know.
      <Button className="w-32">
        Report
      </Button>
    </div>
  )
}

export default function SurveyPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex bg-background sticky top-0 border-b border-border w-screen h-16 items-center z-50">
        <div className="flex-1"></div>
        <div className="flex w-full justify-center text-xl">Survey</div>
        <div className="flex-1"></div>
        <div className="mr-4 h-1/2">
          <ToggleTheme />
        </div>
      </div>
      <div className="mx-8 md:mx-16 lg:mx-32 py-20">
        <ErrorBoundary fallback={<SurveyErrorHappened />}>
          <Suspense fallback=<SurveyFormSkeleton />>
            <FormChoicesProvider formPromise={getDbPromise(null)}>
              <SurveyForm />
            </FormChoicesProvider>
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  )
}
