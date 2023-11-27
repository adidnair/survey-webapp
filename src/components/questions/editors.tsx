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

const EditorError = ({errObject, index, className} : {errObject: FieldErrors, index: number, className?: string}) => {
  if (errObject) {
    if (errObject.editors) {
      // @ts-ignore
      const errArray = errObject.editors as any[]
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

export const Editors = ({editors, form, field} : {
  editors: {ids: number[], names: string[]},
  form: UseFormReturn<formType, any, undefined>,
  field: ControllerRenderProps<formType, "editors">
  }) => {
  return (
    <div className="flex flex-col gap-4">
      {field.value.map((selected_editor, selected_editor_index) => {
        return (
          <div key={selected_editor_index} className="p-4 rounded-lg border border-border relative">
            <X
              width={60}
              className="text-muted-foreground absolute top-4 right-0
              hover:text-primary hover:cursor-pointer"
              onClick={() =>
                form.setValue(field.name,
                  field.value.filter((e) => {
                    return e.id !== selected_editor.id;
                  })
                )
              }
            />
          {form.formState.isSubmitted && <EditorError errObject={form.formState.errors} index={selected_editor_index}
          className="xl:hidden"/>}
          <div
            className="flex flex-col gap-8 xl:flex-row xl:justify-between xl:w-full xl:pt-2 xl:gap-12"
            key={selected_editor.id}
          >
            <div className="flex flex-row gap-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-52 justify-between shrink-0"
                >
                  {editors.names[selected_editor.id]}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-52 p-0">
                <Command className="max-h-72">
                  <CommandInput placeholder="Search editor..." />
                  <CommandEmpty>No match found.</CommandEmpty>
                  <CommandGroup className="overflow-y-scroll">
                    {editors.ids
                      .filter((e) => {
                        if ( e === field.value[selected_editor_index].id)
                          return true;
                        for (const se of field.value) {
                          if (se.id === e) return false;
                        }
                        return true;
                      })
                      .map((editor_id) => (
                        <CommandItem
                          value={editors.names[editor_id]}
                          key={editor_id}
                          onSelect={() => {
                            form.setValue(field.name,
                              field.value.map((e, ei) => {
                                if (ei === selected_editor_index)
                                  return {
                                    id: editor_id,
                                    rating: e.rating,
                                    purpose: e.purpose,
                                  };
                                return e;
                              })
                            );
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              editor_id ===
                                field.value[selected_editor_index].id
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {editors.names[editor_id]}
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
                  <Label className="text-sm text-muted-foreground">How would you rate your experience using this editor?</Label>
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
                        (selected_editor.rating === -1) ? [50] :
                        [selected_editor.rating]
                        }
                      onValueCommit={(val) => {
                        form.setValue(field.name,
                          field.value.map((e, ei) => {
                            if (ei === selected_editor_index)
                              return {
                                id: e.id,
                                rating: val[0],
                                purpose: e.purpose,
                              };
                            return e;
                          })
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4 xl:pl-6">
                  <Label className="text-sm text-muted-foreground pl-4 xl:pl-0">Why did you use this editor?</Label>
                  <div className="px-2 xl:w-96 xl:pl-0 oveflow-hidden">
                    <Select onValueChange={(value) => {
                      const new_purpose = value;
                      // if (value === "Other (please specify)") {
                      //   TODO: Add dialog
                      // }
                      form.setValue(field.name, field.value.map((e, ei) => {
                          if (ei === selected_editor_index) {
                            return {
                              id: e.id,
                              rating: e.rating,
                              purpose: new_purpose,
                            }
                          }
                          return e;
                        })
                      )
                    }} value={selected_editor.purpose}>
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
          {form.formState.isSubmitted && <EditorError errObject={form.formState.errors} index={selected_editor_index}
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
            {"Select editor"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <Command className="max-h-72">
            <CommandInput placeholder="Search editor..." />
            <CommandEmpty>No match found.</CommandEmpty>
            <CommandGroup className="overflow-y-scroll">
              {editors.ids
                .filter((editor_id) => {
                  for (const e of field.value) {
                    if (editor_id === e.id) return false;
                  }
                  return true;
                })
                .map((editor_id) => (
                  <CommandItem
                    value={editors.names[editor_id]}
                    key={editor_id}
                    onSelect={() => {
                      form.setValue(field.name, [
                        ...field.value,
                        {
                          id: editor_id,
                          rating: -1,
                          purpose: "",
                        },
                      ]);
                    }}
                  >
                    {editors.names[editor_id]}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
