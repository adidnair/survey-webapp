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
import {
  LanguagesHeader,
  Languages,
} from "./questions/languages";
import { Separator } from "./ui/separator";
import { toast } from "./ui/use-toast";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { FormError } from "./myui/form-error";
import { use } from "react";
import { useFormPromise } from "./form-provider";
import { skill_levels } from "./questions/skill";
<<<<<<< HEAD
import { WebFrameworks, WebFrameworksHeader } from "./questions/web-frameworks";
=======
import { WebFrameworks } from "./questions/web-frameworks";
>>>>>>> 244f32e2a502d30fedc5a244fe11d6ccde843a45

const SurveyForm = () => {
  const formData = use(useFormPromise())

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
        message: "Please enter your actual age.",
      })
      .max(116, {
        message:
          "The oldest person in the world is 116. Please enter your actual age.",
      }),
    sex: z.string(),
    skill: z.enum(skill_levels.map((val) => val[0]) as [string, ...string[]]),
    languages: z
      .object({
<<<<<<< HEAD
        id: z.number().int().min(-1).max(formData.languages.names.length-1),
=======
        id: z.number().int().min(-1).max(formData.languages.names.length),
>>>>>>> 244f32e2a502d30fedc5a244fe11d6ccde843a45
        experience: z.number().int().min(0, {message: "Please rate your experience"}).max(100),
        recommendation: z.number().int().min(0, {message: "Please enter your recommendation"}).max(100),
      })
      .array(),
    webFrameworks: z
      .object({
<<<<<<< HEAD
        id: z.number().int().min(-1).max(formData.webFrameworks.names.length-1),
=======
        id: z.number().int().min(-1).max(formData.webfs.names.length),
>>>>>>> 244f32e2a502d30fedc5a244fe11d6ccde843a45
        experience: z.number().int().min(0, {message: "Please rate your experience"}).max(100),
        recommendation: z.number().int().min(0, {message: "Please enter your recommendation"}).max(100),
      })
      .array(),
  });


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      age: undefined,
      languages: [],
      webFrameworks: [],
    },
  });


  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    toast({title: "Success!"})
    console.log("Validation success", values);
    // database push
  }

  return (
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
                <Input className="w-80" placeholder="Example: 21" type="number" {...field} />
              </FormControl>
              <FormDescription>Please specify your age</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sex</FormLabel>
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
                      <RadioGroupItem value="" className="peer"/>
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Other
                    </FormLabel>
                    <Input className="absolute translate-x-20 w-32 h-8 peer-data-[state=unchecked]:hidden"
                    placeholder="Specify" {...field}/>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>Please specify your sex</FormDescription>
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
                      <FormItem key={level.charAt(0)} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={level[0]} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </FormLabel>
                      </FormItem>
                  )
                })}
                </RadioGroup>
              </FormControl>
              <FormDescription>Select which skill level describes you best</FormDescription>
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
              {(field.value.length > 0) && <LanguagesHeader />}
              <FormControl>
               <Languages languages={formData.languages} form={form} field={field} />
              </FormControl>
              <FormDescription>
                Select all the languages you know about.
              </FormDescription>
            </FormItem>
          )}}
        />

        <Separator />

        <FormField
          control={form.control}
          name="webFrameworks"
          render={({ field }) => {
            return (
            <FormItem className="flex flex-col">
              <FormLabel className="mb-1">Web Frameworks/Libraries</FormLabel>
<<<<<<< HEAD
              {(field.value.length > 0) && <WebFrameworksHeader />}
              <FormControl>
               <WebFrameworks webFrameworks={formData.webFrameworks} form={form} field={field} />
=======
              {(field.value.length > 0) && <LanguagesHeader />}
              <FormControl>
               <WebFrameworks webFrameworks={formData.languages} form={form} field={field} />
>>>>>>> 244f32e2a502d30fedc5a244fe11d6ccde843a45
              </FormControl>
              <FormDescription>
                Select all the web frameworks, libraries or other technologies you know about.
              </FormDescription>
            </FormItem>
          )}}
        />

        <Separator />

        {(form.formState.isSubmitted && Object.keys(form.formState.errors).length !== 0)
        && <FormError text="Please review the form for errors and make necessary corrections before resubmitting." />}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

// Web Frameworks
// Databases
// Cloud services
// SaaSs
// Misc libraries

export default SurveyForm;
