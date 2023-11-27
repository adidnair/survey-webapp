"use client"

import { createContext, useContext } from "react"
import { getDbPromise } from "./form-data";

const FormContext = createContext<ReturnType<typeof getDbPromise> | null>(null);

export const useFormChoicesPromise = () => {
  const data = useContext(FormContext)
  if (!data) throw new Error("form data should be provided as context")
  return data
}

const FormChoicesProvider = ({
  children,
  formPromise,
}: {
  children: React.ReactNode,
  formPromise: ReturnType<typeof getDbPromise>,
}) => {
  return (
    <FormContext.Provider value={formPromise}>{children}</FormContext.Provider>
  )
}

export default FormChoicesProvider
