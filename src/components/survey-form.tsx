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
import { toast } from "./ui/use-toast";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { FormError } from "./myui/form-error";
import { use, useRef, useState } from "react";
import { useFormChoicesPromise } from "./form-provider";
import { skill_levels } from "./questions/skill";
import { WebTechnologies } from "./questions/web-technologies";
import { checkIfFilled, pushToDB } from "./submit-form";
import { Databases } from "./questions/databases";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { AlertDialogContent } from "@radix-ui/react-alert-dialog";

const SurveyForm = () => {
  const formData = use(useFormChoicesPromise());

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
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      age: undefined,
      gender: "",
      languages: [],
      webTechnologies: [],
      databases: [],
    },
  });

  const rewrite = useRef(false);

  const [openModal, setOpenModal] = useState(false);
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.email !== "") {
      const alreadyFilled = await checkIfFilled(values.email);
      if (alreadyFilled === null) {
        await pushToDB(values, null);
      } else if (alreadyFilled === -1) {
        throw Error("More than one entry found");
      } else {
        // ask do you want to delete?
        setOpenModal(true);
        if (rewrite) {
          await pushToDB(values, alreadyFilled);
        }
      }
    }
  }

  return (
    <>
      <AlertDialog open={openModal} onOpenChange={setOpenModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              We already have a submission with this email
            </AlertDialogTitle>
            <AlertDialogDescription>
              If you continue, the previous submission will be replaced with the
              current one.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                rewrite.current = true;
              }}
            >
              {"Yes I'm sure"}
            </AlertDialogAction>
          </AlertDialogFooter>
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
