import { ControllerRenderProps, FieldErrors, UseFormReturn } from "react-hook-form"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { FormError } from "../myui/form-error";
import { formType } from "../form-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const WebTechnologyError = ({errObject, index, className} : {errObject: FieldErrors, index: number, className?: string}) => {
  if (errObject) {
    if (errObject.webTechnologies) {
      // @ts-ignore
      const errArray = errObject.webTechnologies as any[]
      if (errArray[index]) {
        const err = errArray[index]
        if (err.proficiency) {
          return <FormError text={err.proficiency.message} className={className} />
        }
        if (err.recommendation) {
          return <FormError text={err.recommendation.message} className={className} />
        }
        if (err.purpose) {
          return <FormError text={err.purpose.message} className={className} />
        }
      }
    }
  }
  return null
}

const purposes = [
  "Did not learn",
  "Work",
  "Coursework",
  "Hobby",
  "To solve a specific problem",
  "To contribute to open source software",
  "To stay ahead of the curve",
  "For personal enrichment",
  "Other (please specify)"
]

export const WebTechnologies = ({webTechnologies, form, field} : {
  webTechnologies: {ids: number[], names: string[]},
  form: UseFormReturn<formType, any, undefined>,
  field: ControllerRenderProps<formType, "webTechnologies">
  }) => {
  return (
    <div className="flex flex-col gap-4">
      {field.value.map((selected_webtech, selected_webtech_index) => {
        return (
          <div key={selected_webtech_index} className="p-4 rounded-lg border border-border relative">
            <X
              width={60}
              className="text-muted-foreground absolute top-4 right-0
              hover:text-primary hover:cursor-pointer"
              onClick={() =>
                form.setValue(field.name,
                  field.value.filter((wt) => {
                    return wt.id !== selected_webtech.id;
                  })
                )
              }
            />
          {form.formState.isSubmitted && <WebTechnologyError errObject={form.formState.errors} index={selected_webtech_index}
          className="xl:hidden"/>}
          <div
            className="flex flex-col gap-8 xl:flex-row xl:justify-between xl:w-full xl:pt-2 xl:gap-12"
            key={selected_webtech.id}
          >
            <div className="flex flex-row gap-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-52 justify-between shrink-0"
                >
                  {webTechnologies.names[selected_webtech.id]}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-52 p-0">
                <Command className="max-h-72">
                  <CommandInput placeholder="Search technology..." />
                  <CommandEmpty>No technology found.</CommandEmpty>
                  <CommandGroup className="overflow-y-scroll">
                    {webTechnologies.ids
                      .filter((wt) => {
                        if ( wt === field.value[selected_webtech_index].id)
                          return true;
                        for (const swt of field.value) {
                          if (swt.id === wt) return false;
                        }
                        return true;
                      })
                      .map((webtech_id) => (
                        <CommandItem
                          value={webTechnologies.names[webtech_id]}
                          key={webtech_id}
                          onSelect={() => {
                            form.setValue(field.name,
                              field.value.map((wt, wti) => {
                                if (wti === selected_webtech_index)
                                  return {
                                    id: webtech_id,
                                    proficiency: wt.proficiency,
                                    recommendation: wt.recommendation,
                                    purpose: wt.purpose,
                                  };
                                return wt;
                              })
                            );
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              webtech_id ===
                                field.value[selected_webtech_index].id
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {webTechnologies.names[webtech_id]}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            </div>

            <div className="flex flex-col gap-12 xl:grow xl:gap-8">
              <div className="flex flex-col gap-12 lg:flex-row lg:justify-start lg:px-6 lg:grow lg:gap-16 xl:gap-24">
                <div className="flex flex-col xl:grow xl:max-w-[300px] max-xl:pl-4 max-xl:w-80">
                  <Label className="text-sm text-muted-foreground">How good are you at using the technology?</Label>
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row w-[105%] justify-between pt-4">
                      <p className="text-xs whitespace-pre-wrap">Beginner</p>
                      <p className="text-xs whitespace-pre-wrap">Intermediate</p>
                      <p className="text-xs whitespace-pre-wrap">  Expert</p>
                    </div>
                    <div className="flex flex-row w-[94%] justify-between mb-[3px]">
                      <Separator orientation="vertical" className="h-1 w-[1px] bg-primary" />
                      <Separator orientation="vertical" className="h-1 w-[1px] bg-primary" />
                      <Separator orientation="vertical" className="h-1 w-[1px] bg-primary" />
                    </div>
                    <Slider
                      name="experience"
                      min={0}
                      max={100}
                      step={1}
                      defaultValue={[50]}
                      onValueCommit={(val) => {
                        form.setValue(field.name,
                          field.value.map((wt, wti) => {
                            if (wti === selected_webtech_index)
                              return {
                                id: wt.id,
                                proficiency: val[0],
                                recommendation: wt.recommendation,
                                purpose: wt.purpose,
                              };
                            return wt;
                          })
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col touch-none xl:grow xl:max-w-[300px] max-xl:pl-4 max-xl:w-80">
                  <Label className="text-sm text-muted-foreground">How much do you like using the technology?</Label>
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row w-[105%] justify-between pt-4">
                    <p className="text-xs whitespace-pre-wrap">Hate It</p>
                    <p className="text-xs whitespace-pre-wrap">Indifferent</p>
                    <p className="text-xs whitespace-pre-wrap">Love It</p>
                    </div>
                    <div className="flex flex-row w-[94%] justify-between mb-[3px]">
                      <Separator orientation="vertical" className="h-1 w-[1px] bg-primary" />
                      <Separator orientation="vertical" className="h-1 w-[1px] bg-primary" />
                      <Separator orientation="vertical" className="h-1 w-[1px] bg-primary" />
                    </div>
                    <Slider
                      name="recommendation"
                      min={0}
                      max={100}
                      step={1}
                      defaultValue={[50]}
                      onValueCommit={(val) => {
                        form.setValue(field.name,
                          field.value.map((wt, wti) => {
                            if (wti === selected_webtech_index)
                              return {
                                id: wt.id,
                                proficiency: wt.proficiency,
                                recommendation: val[0],
                                purpose: wt.purpose,
                              };
                            return wt;
                          })
                        );
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-10 xl:flex-row xl:grow xl:gap-4">
                <div className="flex flex-col gap-4 xl:pl-6">
                  <Label className="text-sm text-muted-foreground pl-4 xl:pl-0">Why did you learn this technology?</Label>
                  <div className="px-2 xl:w-96 xl:pl-0 oveflow-hidden">
                    <Select onValueChange={(value) => {
                      const new_purpose = value;
                      if (value === "Other (please specify)") {
                        // TODO: Add dialog
                      }
                      form.setValue(field.name, field.value.map((wt, wti) => {
                          if (wti === selected_webtech_index) {
                            return {
                              id: wt.id,
                              proficiency: wt.proficiency,
                              recommendation: wt.recommendation,
                              purpose: new_purpose,
                            }
                          }
                          return wt;
                        })
                      )
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason"/>
                      </SelectTrigger>
                      <SelectContent>
                        {purposes.map((purpose, i) => {
                          return (
                            <SelectItem key={i} value={purpose}>{purpose}</SelectItem>
                          )
                          })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center w-5 max-xl:hidden"></div>
          </div>
          {form.formState.isSubmitted && <WebTechnologyError errObject={form.formState.errors} index={selected_webtech_index}
          className="max-xl:hidden"/>}
          </div>
        );
      })}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-52 justify-between text-muted-foreground bg-muted"
          >
            {"Select technology"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-0">
          <Command className="max-h-72">
            <CommandInput placeholder="Search technology..." />
            <CommandEmpty>No technology found.</CommandEmpty>
            <CommandGroup className="overflow-y-scroll">
              {webTechnologies.ids
                .filter((webtech_id) => {
                  for (const wt of field.value) {
                    if (webtech_id === wt.id) return false;
                  }
                  return true;
                })
                .map((webtech_id) => (
                  <CommandItem
                    value={webTechnologies.names[webtech_id]}
                    key={webtech_id}
                    onSelect={() => {
                      form.setValue(field.name, [
                        ...field.value,
                        {
                          id: webtech_id,
                          proficiency: -1,
                          recommendation: -1,
                          purpose: "",
                        },
                      ]);
                    }}
                  >
                    {webTechnologies.names[webtech_id]}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
