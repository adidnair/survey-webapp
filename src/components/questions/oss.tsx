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

const OSError = ({errObject, index, className} : {errObject: FieldErrors, index: number, className?: string}) => {
  if (errObject) {
    if (errObject.oss) {
      // @ts-ignore
      const errArray = errObject.oss as any[]
      if (errArray[index]) {
        const err = errArray[index]
        if (err.rating) {
          return <FormError text={err.rating.message} className={className} />
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
  "did not use",
  "work",
  "daily use",
  "for a specific use case"
]

export const OSs = ({oss, form, field} : {
  oss: {ids: number[], names: string[]},
  form: UseFormReturn<formType, any, undefined>,
  field: ControllerRenderProps<formType, "oss">
  }) => {
  return (
    <div className="flex flex-col gap-4">
      {field.value.map((selected_os, selected_os_index) => {
        return (
          <div key={selected_os_index} className="p-4 rounded-lg border border-border relative">
            <X
              width={60}
              className="text-muted-foreground absolute top-4 right-0
              hover:text-primary hover:cursor-pointer"
              onClick={() =>
                form.setValue(field.name,
                  field.value.filter((o) => {
                    return o.id !== selected_os.id;
                  })
                )
              }
            />
          {form.formState.isSubmitted && <OSError errObject={form.formState.errors} index={selected_os_index}
          className="xl:hidden"/>}
          <div
            className="flex flex-col gap-8 xl:flex-row xl:justify-between xl:w-full xl:pt-2 xl:gap-12"
            key={selected_os.id}
          >
            <div className="flex flex-row gap-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-52 justify-between shrink-0"
                >
                  {oss.names[selected_os.id]}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-52 p-0">
                <Command className="max-h-72">
                  <CommandInput placeholder="Search os..." />
                  <CommandEmpty>No match found.</CommandEmpty>
                  <CommandGroup className="overflow-y-scroll">
                    {oss.ids
                      .filter((o) => {
                        if ( o === field.value[selected_os_index].id)
                          return true;
                        for (const so of field.value) {
                          if (so.id === o) return false;
                        }
                        return true;
                      })
                      .map((os_id) => (
                        <CommandItem
                          value={oss.names[os_id]}
                          key={os_id}
                          onSelect={() => {
                            form.setValue(field.name,
                              field.value.map((o, oi) => {
                                if (oi === selected_os_index)
                                  return {
                                    id: os_id,
                                    rating: o.rating,
                                    purpose: o.purpose,
                                  };
                                return o;
                              })
                            );
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              os_id ===
                                field.value[selected_os_index].id
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {oss.names[os_id]}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            </div>

            <div className="flex flex-col gap-12 xl:grow xl:gap-8">
              <div className="flex flex-col gap-12 lg:flex-row lg:justify-start lg:items-center lg:px-6 lg:grow lg:gap-16 xl:gap-24">
                <div className="flex flex-col xl:grow xl:max-w-[300px] max-xl:pl-4 max-xl:w-80">
                  <Label className="text-sm text-muted-foreground">How would you rate your experience using this os?</Label>
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row w-[105%] justify-between pt-4">
                      <p className="text-xs whitespace-pre-wrap">Bad</p>
                      <p className="text-xs whitespace-pre-wrap">   Average</p>
                      <p className="text-xs whitespace-pre-wrap">Good</p>
                    </div>
                    <div className="flex flex-row w-[94%] justify-between mb-[3px]">
                      <Separator orientation="vertical" className="h-1 w-[1px] bg-primary" />
                      <Separator orientation="vertical" className="h-1 w-[1px] bg-primary" />
                      <Separator orientation="vertical" className="h-1 w-[1px] bg-primary" />
                    </div>
                    <Slider
                      name="rating"
                      min={0}
                      max={100}
                      step={1}
                      defaultValue={
                        (selected_os.rating === -1) ? [50] :
                        [selected_os.rating]
                        }
                      onValueCommit={(val) => {
                        form.setValue(field.name,
                          field.value.map((o, oi) => {
                            if (oi === selected_os_index)
                              return {
                                id: o.id,
                                rating: val[0],
                                purpose: o.purpose,
                              };
                            return o;
                          })
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 xl:pl-6">
                  <Label className="text-sm text-muted-foreground pl-4 xl:pl-0">Why did you use this os?</Label>
                  <div className="px-2 xl:w-96 xl:pl-0 oveflow-hidden">
                    <Select onValueChange={(value) => {
                      const new_purpose = value;
                      // if (value === "Other (please specify)") {
                      //   TODO: Add dialog
                      // }
                      form.setValue(field.name, field.value.map((o, oi) => {
                          if (oi === selected_os_index) {
                            return {
                              id: o.id,
                              rating: o.rating,
                              purpose: new_purpose,
                            }
                          }
                          return o;
                        })
                      )
                    }} value={selected_os.purpose}>
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
          {form.formState.isSubmitted && <OSError errObject={form.formState.errors} index={selected_os_index}
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
            {"Select OS"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <Command className="max-h-72">
            <CommandInput placeholder="Search os..." />
            <CommandEmpty>No match found.</CommandEmpty>
            <CommandGroup className="overflow-y-scroll">
              {oss.ids
                .filter((os_id) => {
                  for (const o of field.value) {
                    if (os_id === o.id) return false;
                  }
                  return true;
                })
                .map((os_id) => (
                  <CommandItem
                    value={oss.names[os_id]}
                    key={os_id}
                    onSelect={() => {
                      form.setValue(field.name, [
                        ...field.value,
                        {
                          id: os_id,
                          rating: -1,
                          purpose: "",
                        },
                      ]);
                    }}
                  >
                    {oss.names[os_id]}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
