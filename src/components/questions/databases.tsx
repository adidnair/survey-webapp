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

const DatabaseError = ({errObject, index, className} : {errObject: FieldErrors, index: number, className?: string}) => {
  if (errObject) {
    if (errObject.databases) {
      // @ts-ignore
      const errArray = errObject.databases as any[]
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

export const Databases = ({databases, form, field} : {
  databases: {ids: number[], names: string[]},
  form: UseFormReturn<formType, any, undefined>,
  field: ControllerRenderProps<formType, "databases">
  }) => {
  return (
    <div className="flex flex-col gap-4">
      {field.value.map((selected_database, selected_db_index) => {
        return (
          <div key={selected_db_index} className="p-4 rounded-lg border border-border relative">
            <X
              width={60}
              className="text-muted-foreground absolute top-4 right-0
              hover:text-primary hover:cursor-pointer"
              onClick={() =>
                form.setValue(field.name,
                  field.value.filter((db) => {
                    return db.id !== selected_database.id;
                  })
                )
              }
            />
          {form.formState.isSubmitted && <DatabaseError errObject={form.formState.errors} index={selected_db_index}
          className="xl:hidden"/>}
          <div
            className="flex flex-col gap-8 xl:flex-row xl:justify-between xl:w-full xl:pt-2 xl:gap-12"
            key={selected_database.id}
          >
            <div className="flex flex-row gap-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-52 justify-between shrink-0"
                >
                  {databases.names[selected_database.id]}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-52 p-0">
                <Command className="max-h-72">
                  <CommandInput placeholder="Search database technology..." />
                  <CommandEmpty>No match found.</CommandEmpty>
                  <CommandGroup className="overflow-y-scroll">
                    {databases.ids
                      .filter((db) => {
                        if ( db === field.value[selected_db_index].id)
                          return true;
                        for (const sdb of field.value) {
                          if (sdb.id === db) return false;
                        }
                        return true;
                      })
                      .map((database_id) => (
                        <CommandItem
                          value={databases.names[database_id]}
                          key={database_id}
                          onSelect={() => {
                            form.setValue(field.name,
                              field.value.map((db, dbi) => {
                                if (dbi === selected_db_index)
                                  return {
                                    id: database_id,
                                    proficiency: db.proficiency,
                                    recommendation: db.recommendation,
                                    purpose: db.purpose,
                                  };
                                return db;
                              })
                            );
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              database_id ===
                                field.value[selected_db_index].id
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {databases.names[database_id]}
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
                  <Label className="text-sm text-muted-foreground">How good are you at using the database?</Label>
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
                        (selected_database.proficiency === -1) ? [50] :
                        [selected_database.proficiency]
                        }
                      onValueCommit={(val) => {
                        form.setValue(field.name,
                          field.value.map((db, dbi) => {
                            if (dbi === selected_db_index)
                              return {
                                id: db.id,
                                proficiency: val[0],
                                recommendation: db.recommendation,
                                purpose: db.purpose,
                              };
                            return db;
                          })
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col touch-none xl:grow xl:max-w-[300px] max-xl:pl-4 max-xl:w-80">
                  <Label className="text-sm text-muted-foreground">How much do you like using the database?</Label>
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
                        (selected_database.recommendation === -1) ? [50] :
                        [selected_database.recommendation]
                        }
                      onValueCommit={(val) => {
                        form.setValue(field.name,
                          field.value.map((db, dbi) => {
                            if (dbi === selected_db_index)
                              return {
                                id: db.id,
                                proficiency: db.proficiency,
                                recommendation: val[0],
                                purpose: db.purpose,
                              };
                            return db;
                          })
                        );
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-10 xl:flex-row xl:grow xl:gap-4">
                <div className="flex flex-col gap-4 xl:pl-6">
                  <Label className="text-sm text-muted-foreground pl-4 xl:pl-0">Why did you learn this database?</Label>
                  <div className="px-2 xl:w-96 xl:pl-0 oveflow-hidden">
                    <Select onValueChange={(value) => {
                      const new_purpose = value;
                      // if (value === "Other (please specify)") {
                      //   TODO: Add dialog
                      // }
                      form.setValue(field.name, field.value.map((db, dbi) => {
                          if (dbi === selected_db_index) {
                            return {
                              id: db.id,
                              proficiency: db.proficiency,
                              recommendation: db.recommendation,
                              purpose: new_purpose,
                            }
                          }
                          return db;
                        })
                      )
                    }} value={selected_database.purpose}>
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
          {form.formState.isSubmitted && <DatabaseError errObject={form.formState.errors} index={selected_db_index}
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
            {"Select database technology"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <Command className="max-h-72">
            <CommandInput placeholder="Search database technology..." />
            <CommandEmpty>No match found.</CommandEmpty>
            <CommandGroup className="overflow-y-scroll">
              {databases.ids
                .filter((database_id) => {
                  for (const db of field.value) {
                    if (database_id === db.id) return false;
                  }
                  return true;
                })
                .map((database_id) => (
                  <CommandItem
                    value={databases.names[database_id]}
                    key={database_id}
                    onSelect={() => {
                      form.setValue(field.name, [
                        ...field.value,
                        {
                          id: database_id,
                          proficiency: -1,
                          recommendation: -1,
                          purpose: "",
                        },
                      ]);
                    }}
                  >
                    {databases.names[database_id]}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
