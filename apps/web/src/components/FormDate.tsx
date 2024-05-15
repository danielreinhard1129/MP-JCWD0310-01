"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";

interface FormDateProps {
  name: string;
  placeholder: string;
  onBlur: () => void;
  onChange: (date: Date | [Date, Date] | null) => void;
  value: string;
  isError: boolean;
  error: string | undefined;
  label: string;
}

const FormDate: React.FC<FormDateProps> = ({
  name,
  label,
  onBlur,
  onChange,
  placeholder,
  value,
  error,
  isError,
}) => {
  const [date, setDate] = React.useState<Date>();

  return (
    <>
      <div className="flex h-[54px] w-full flex-col  rounded-sm px-0 py-2 my-3">
        <Label htmlFor={name} className={isError ? "text-red-600" : ""}>
          {label}
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "md:w-full justify-start h-12 bg-marine-100 text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              
              <CalendarIcon className="mr-2 h-12 w-4" />
              {date ? format(date, "dd/MMM/yyyy") : <span>{placeholder}</span>}

              
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              captionLayout="dropdown"
              fromYear={1960}
              toYear={2027}
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default FormDate;
