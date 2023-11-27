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

const AppTechError = ({errObject, index, className} : {errObject: FieldErrors, index: number, className?: string}) => {
  if (errObject) {
    if (errObject.appTechnologies) {
      // @ts-ignore
      const errArray = errObject.appTechnologies as any[]
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
  "did not learn",
  "work",
  "coursework",
  "hobby",
  "to solve a specific problem",
  "to contribute to open source software",
  "to stay ahead of the curve",
  "for personal enrichment",
]

export const AppTechnologies = ({appTechnologies, form, field} : {
  appTechnologies: {ids: number[], names: string[]},
  form: UseFormReturn<formType, any, undefined>,
  field: ControllerRenderProps<formType, "appTechnologies">
  }) => {
  return (
    <div className="flex flex-col gap-4">
      {field.value.map((selected_appTechnology, selected_appTech_index) => {
        return (
          <div key={selected_appTech_index} className="p-4 rounded-lg border border-border relative">
            <X
              width={60}
              className="text-muted-foreground absolute top-4 right-0
              hover:text-primary hover:cursor-pointer"
              onClick={() =>
                form.setValue(field.name,
                  field.value.filter((at) => {
                    return at.id !== selected_appTechnology.id;
                  })
                )
              }
            />
          {form.formState.isSubmitted && <AppTechError errObject={form.formState.errors} index={selected_appTech_index}
          className="xl:hidden"/>}
          <div
            className="flex flex-col gap-8 xl:flex-row xl:justify-between xl:w-full xl:pt-2 xl:gap-12"
            key={selected_appTechnology.id}
          >
            <div className="flex flex-row gap-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-52 justify-between shrink-0"
                >
                  {appTechnologies.names[selected_appTechnology.id]}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-52 p-0">
                <Command className="max-h-72">
                  <CommandInput placeholder="Search web technology..." />
                  <CommandEmpty>No technology found.</CommandEmpty>
                  <CommandGroup className="overflow-y-scroll">
                    {appTechnologies.ids
                      .filter((at) => {
                        if ( at === field.value[selected_appTech_index].id)
                          return true;
                        for (const sat of field.value) {
                          if (sat.id === at) return false;
                        }
                        return true;
                      })
                      .map((appTechnology_id) => (
                        <CommandItem
                          value={appTechnologies.names[appTechnology_id]}
                          key={appTechnology_id}
                          onSelect={() => {
                            form.setValue(field.name,
                              field.value.map((at, ati) => {
                                if (ati === selected_appTech_index)
                                  return {
                                    id: appTechnology_id,
                                    proficiency: at.proficiency,
                                    recommendation: at.recommendation,
                                    purpose: at.purpose,
                                  };
                                return at;
                              })
                            );
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              appTechnology_id ===
                                field.value[selected_appTech_index].id
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {appTechnologies.names[appTechnology_id]}
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
                      defaultValue={
                        (selected_appTechnology.proficiency === -1) ? [50] :
                        [selected_appTechnology.proficiency]
                        }
                      onValueCommit={(val) => {
                        form.setValue(field.name,
                          field.value.map((at, ati) => {
                            if (ati === selected_appTech_index)
                              return {
                                id: at.id,
                                proficiency: val[0],
                                recommendation: at.recommendation,
                                purpose: at.purpose,
                              };
                            return at;
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
                      defaultValue={
                        (selected_appTechnology.recommendation === -1) ? [50] :
                        [selected_appTechnology.recommendation]
                        }
                      onValueCommit={(val) => {
                        form.setValue(field.name,
                          field.value.map((wt, wti) => {
                            if (wti === selected_appTech_index)
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
                      // if (value === "Other (please specify)") {
                      //   TODO: Add dialog
                      // }
                      form.setValue(field.name, field.value.map((at, ati) => {
                          if (ati === selected_appTech_index) {
                            return {
                              id: at.id,
                              proficiency: at.proficiency,
                              recommendation: at.recommendation,
                              purpose: new_purpose,
                            }
                          }
                          return at;
                        })
                      )
                    }} value={selected_appTechnology.purpose}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason"/>
                      </SelectTrigger>
                      <SelectContent>
                        {purposes.map((purpose, i) => {
                          return (
                            <SelectItem key={i} value={purpose}>{purpose.charAt(0).toUpperCase() + purpose.slice(1)}</SelectItem>
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
          {form.formState.isSubmitted && <AppTechError errObject={form.formState.errors} index={selected_appTech_index}
          className="max-xl:hidden"/>}
          </div>
        );
      })}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-80 justify-between text-muted-foreground bg-muted"
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
              {appTechnologies.ids
                .filter((appTechnology_id) => {
                  for (const at of field.value) {
                    if (appTechnology_id === at.id) return false;
                  }
                  return true;
                })
                .map((appTechnology_id) => (
                  <CommandItem
                    value={appTechnologies.names[appTechnology_id]}
                    key={appTechnology_id}
                    onSelect={() => {
                      form.setValue(field.name, [
                        ...field.value,
                        {
                          id: appTechnology_id,
                          proficiency: -1,
                          recommendation: -1,
                          purpose: "",
                        },
                      ]);
                    }}
                  >
                    {appTechnologies.names[appTechnology_id]}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
