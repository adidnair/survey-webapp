"use client"

import { createContext, useContext } from "react"
import type { dbPromise } from "./form-data";

const FormContext = createContext<typeof dbPromise | null>(null);

export const useFormPromise = () => {
  const data = useContext(FormContext)
  if (!data) throw new Error("form data should be provided as context")
  return data
}

const FormProvider = ({
  children,
  formPromise,
}: {
  children: React.ReactNode,
  formPromise: typeof dbPromise,
}) => {
  return (
    <FormContext.Provider value={formPromise}>{children}</FormContext.Provider>
  )
}

export default FormProvider
