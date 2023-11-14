"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Languages } from "./questions/languages";
import { Separator } from "./ui/separator";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { FormError } from "./myui/form-error";
import { use, useState } from "react";
import { useFormChoicesPromise } from "./form-provider";
import { skill_levels } from "./questions/skill";
import { WebTechnologies } from "./questions/web-technologies";
import { checkIfFilled, pushToDB } from "./submit-form";
import { Databases } from "./questions/databases";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle } from "lucide-react";

const SurveyForm = () => {
  const formDataPromiseResult = use(useFormChoicesPromise());
  if (formDataPromiseResult === -1) {
    throw Error("error fetching from database")
  }

  const formSchema = z.object({
    email: z
      .string()
      .email({
        message: "Please enter a valid email",
      })
      .or(z.string().length(0)),
    age: z.coerce
      .number({ invalid_type_error: "Please enter a number." })
      .int()
      .min(1, {
        message: "Please enter your age.",
      })
      .max(116, {
        message:
          "The oldest person in the world is 116. Please enter your actual age.",
      }),
    gender: z.string().min(1, { message: "Please specify your gender" }),
    skill: z.enum(skill_levels as [string, ...string[]]),
    // occupation: z.string(),
    languages: z
      .object({
        id: z.number().int().min(1),
        proficiency: z
          .number()
          .int()
          .min(0, { message: "Please enter your proficiency" })
          .max(100),
        recommendation: z
          .number()
          .int()
          .min(0, { message: "Please enter your recommendation" })
          .max(100),
        purpose: z.string().min(1, { message: "Please select a reason" }),
      })
      .array(),
    webTechnologies: z
      .object({
        id: z.number().int().min(1),
        proficiency: z
          .number()
          .int()
          .min(0, { message: "Please enter your proficiency" })
          .max(100),
        recommendation: z
          .number()
          .int()
          .min(0, { message: "Please enter your recommendation" })
          .max(100),
        purpose: z.string().min(1, { message: "Please select a reason" }),
      })
      .array(),
    databases: z
      .object({
        id: z.number().int().min(1),
        proficiency: z
          .number()
          .int()
          .min(0, { message: "Please enter your proficiency" })
          .max(100),
        recommendation: z
          .number()
          .int()
          .min(0, { message: "Please enter your recommendation" })
          .max(100),
        purpose: z.string().min(1, { message: "Please select a reason" }),
      })
      .array(),
    newLanguages: z
      .object({
        id: z.number().int().min(1),
        name: z.string().min(1),
      })
      .array(),
  });

  const formData = formDataPromiseResult.options
  const prevFilledData = formDataPromiseResult.prevFilledData

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalState, setModalState] = useState<
    "empty" | "submitting" | "confirm rewrite" | "success" | "error"
  >("empty");
  const [promiseResolver, setPromiseResolver] = useState<((rewrite: boolean) => void) | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: (prevFilledData !== null && prevFilledData !== 0 && prevFilledData !== -1)
    ? {
      email: prevFilledData.email,
      age: prevFilledData.age,
      gender: prevFilledData.gender,
      skill: prevFilledData.skill,
      languages: prevFilledData.languages,
      webTechnologies: prevFilledData.webTechnologies,
      databases: prevFilledData.databases,
      newLanguages: [],
    }
    : {
      email: "",
      age: undefined,
      gender: "",
      languages: [],
      webTechnologies: [],
      databases: [],
      newLanguages: [],
    },
  });

  if (prevFilledData === 0) {
    return (
      <div className="text-center text-3xl">Cound not find submission for user</div>
    )
  }
  if (prevFilledData === -1) {
    throw Error("error in fetching submission")
  }

  const createPromise = () => {
    return new Promise<boolean>((resolve) => {
      setPromiseResolver(() => resolve);
    });
  }


  async function onSubmit(values: z.infer<typeof formSchema>) {
    let gen_id: string | -1 = -1
    setModalState("submitting")
    setOpenModal(true);
    if (values.email !== "") {
      const alreadyFilled = await checkIfFilled(values.email);
      if (alreadyFilled === null) {
        gen_id = await pushToDB(values, null);
      } else if (alreadyFilled !== -1) {
        setModalState("confirm rewrite")
        const rewrite = await createPromise()
        if (rewrite) {
          setModalState("submitting")
          gen_id = await pushToDB(values, alreadyFilled);
        } else {
          return
        }
      }
    } else {
      gen_id = await pushToDB(values, null)
    }
    if (gen_id === -1) {
      setModalState("error")
    } else {
      setModalState("success")
      await new Promise((res) => {setTimeout(res, 1000)})
      router.push(`/completed/${gen_id}`)
      return
    }
    setModalState("empty")
  }

  return (
    <>
      <AlertDialog open={openModal} onOpenChange={setOpenModal}>
        <AlertDialogContent className="flex flex-col justify-between h-1/3">
          {modalState === "confirm rewrite" && (
            <AlertDialogHeader>
              <>
              <AlertDialogTitle>
                We already have a submission with this email
              </AlertDialogTitle>
              <AlertDialogDescription>
                If you continue, the previous submission will be replaced with the
                current one.
              </AlertDialogDescription>
              </>
            </AlertDialogHeader>
          )}
          <div className="flex h-full items-center justify-center">
            {(modalState === "submitting")
              ? "Submitting..." : (modalState === "success")
                ? <div className="flex flex-col items-center gap-6">
                    <CheckCircle color="#65A30D" size={100}/>
                    <p>Successfully submitted!</p>
                  </div> : (modalState === "error")
                  ? <div className="flex flex-col items-center gap-6">
                      <AlertCircle color="red" size={100}/>
                      <p className="text-center">Something went wrong :/<br />Try to submit again</p>
                    </div> : ""}
          </div>
          {(modalState === "confirm rewrite") &&
            <AlertDialogFooter>
              <AlertDialogCancel
              onClick={() => {
                if (promiseResolver) {
                  promiseResolver(false)
                }
              }}
            >Cancel</AlertDialogCancel>
              <Button
              onClick={() => {
                if (promiseResolver) {
                  promiseResolver(true)
                }
              }}
            >
            {"Yes I'm sure"}
            </Button>
            </AlertDialogFooter>
          }
          {(modalState === "error") &&
            <AlertDialogFooter>
              <AlertDialogCancel
              onClick={() => {
                if (promiseResolver) {
                  promiseResolver(false)
                }
              }}
            >Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          }
        </AlertDialogContent>
      </AlertDialog>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="w-80"
                    placeholder="Example: email@domain.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please provide your email address. Rest assured, we will not
                  send you any emails or disclose your email to anyone. However,
                  if you prefer, you can leave this field blank.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    className="w-80"
                    placeholder="Example: 21"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Please specify your age</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Male
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Female
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Specify" className="peer" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Other
                      </FormLabel>
                      <Input
                        className="absolute translate-x-20 w-max h-8 peer-data-[state=unchecked]:hidden"
                        placeholder="Specify"
                        {...field}
                      />
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription>Please specify your gender</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <FormField
            control={form.control}
            name="skill"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skill</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {skill_levels.map((level) => {
                      return (
                        <FormItem
                          key={level.charAt(0)}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={level} />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </FormLabel>
                        </FormItem>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  Please select which skill level describes you best
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <FormField
            control={form.control}
            name="languages"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-1">Languages</FormLabel>
                  <FormControl>
                    <Languages
                      languages={formData.languages}
                      form={form}
                      field={field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please select all the languages you know about.
                  </FormDescription>
                </FormItem>
              );
            }}
          />

          <Separator />

          <FormField
            control={form.control}
            name="webTechnologies"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-1">Web Technologies</FormLabel>
                  <FormControl>
                    <WebTechnologies
                      webTechnologies={formData.webTechnologies}
                      form={form}
                      field={field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please select all the web frameworks, libraries or other
                    technologies you know about.
                  </FormDescription>
                </FormItem>
              );
            }}
          />

          <Separator />

          <FormField
            control={form.control}
            name="databases"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-1">Database Technologies</FormLabel>
                  <FormControl>
                    <Databases
                      databases={formData.databases}
                      form={form}
                      field={field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please select all the database technologies you know about.
                  </FormDescription>
                </FormItem>
              );
            }}
          />

          <Separator />

          {form.formState.isSubmitted &&
            Object.keys(form.formState.errors).length !== 0 && (
              <FormError text="Please review the form for errors and make necessary corrections before resubmitting." />
            )}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

// Web Frameworks
// Databases
// Cloud services
// SaaSs
// Misc libraries

export default SurveyForm;
