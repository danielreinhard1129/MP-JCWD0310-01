"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { FormikHandlers } from "formik";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { FC, HTMLInputTypeAttribute, useState } from "react";

interface AddTicketProps {
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  onChange: FormikHandlers["handleChange"];
  onBlur: FormikHandlers["handleBlur"];
  value: string;
  isError: boolean;
  error: string | undefined;
  label: string;
    disabled: boolean;
}

const AddTicket: FC<AddTicketProps> = ({
  name,
  label,
  type ='text',
  onBlur,
  onChange,
  placeholder,
  value,
  error,
  isError,
  disabled = false,
}) => {
  const [startDate, setStartDate] = React.useState<Date>();
  const [expiresDate, setExpiresDate] = React.useState<Date>();
  const [isFree, setIsFree] = useState(false);

  const handleCategoryChange = (category: string) => {
    setIsFree(category === "Free");
  };

  return (
    <div className="my-2 flex h-[54px] w-full  flex-col rounded-sm px-0 py-2">
      <Label htmlFor="ticket" className="text-sm">
        {label}
      </Label>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="mx-auto flex h-12 w-[200px] justify-center rounded-sm bg-marine-100 pl-4 text-center"
            variant="outline"
          >
            {/* <FaRupiahSign className="mr-3 h-12 w-4" /> */}
            Add Ticket
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mx-auto text-gray-500">
              Ticket Detail
            </DialogTitle>
          </DialogHeader>
          <Tabs>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="price">Ticket Price</TabsTrigger>
              <TabsTrigger value="detail">Selling Detail</TabsTrigger>
            </TabsList>
            <TabsContent value="price">
              <div className="my-3 grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Ticket Name
                </Label>
                <Input
                  placeholder={placeholder}
                  name={name}
                  type={type}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  className={isError ? "border-red-600" : "col-span-3"}
                  //   disabled={disabled}
                />
                {isError ? (
                  <div className="text-xs text-red-500">{error}</div>
                ) : null}
              </div>
              <div className="my-3 grid grid-cols-4 items-center gap-4">
                <Label htmlFor="jumlah" className="text-right">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a ticket" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Ticket</SelectLabel>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Free">Free</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="my-3 grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Ticket Price
                </Label>
                <Input
                  placeholder={placeholder}
                  name={name}
                  type={type}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  className={isError ? "border-red-600" : "col-span-3"}
                  //   disabled={disabled}
                />
                {isError ? (
                  <div className="text-xs text-red-500">{error}</div>
                ) : null}
              </div>
              <div className="my-3 grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isFree" className="text-right">
                  Free Ticket
                </Label>
                <Checkbox
                  onChange={onChange}
                  onBlur={onBlur}
                  className="border-primary-500 mr-2 h-5 w-5 border-2"
                />
              </div>
              {/* <div className="my-3 ml-24 flex justify-start gap-4 p-4">
                <Button className="w-[150px] bg-marine-300">Next</Button>
              </div> */}
            </TabsContent>
            <TabsContent value="detail">
              <div>
                <p className="text-xs">
                  The maximum sale date depends on the end date of the event.
                </p>
              </div>
              <div className="my-3 grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Available Seats
                </Label>
                <Input
                  placeholder={placeholder}
                  name={name}
                  type={type}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  className={isError ? "border-red-600" : "col-span-3"}
                  //   disabled={disabled}
                />
                {isError ? (
                  <div className="text-xs text-red-500">{error}</div>
                ) : null}
              </div>
              {/*Start Date MANAGE */}
              <div>
                <div className="my-3 grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor={name}
                    className={isError ? "text-red-600" : "text-right"}
                  >
                    Start Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "col-span-3",
                          !startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-12 w-4" />
                        {startDate ? (
                          format(startDate, "dd/MMM/yyyy")
                        ) : (
                          <span>{placeholder}</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        captionLayout="dropdown"
                        fromYear={1960}
                        toYear={2027}
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/*Start Date END */}
                {/*Expires Date MANAGE */}

                <div className="my-3 grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor={name}
                    className={isError ? "text-red-600" : "text-right"}
                  >
                    Expires Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "col-span-3",
                          !expiresDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-12 w-4" />
                        {expiresDate ? (
                          format(expiresDate, "dd/MMM/yyyy")
                        ) : (
                          <span>{placeholder}</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        captionLayout="dropdown"
                        fromYear={1960}
                        toYear={2027}
                        mode="single"
                        selected={expiresDate}
                        onSelect={setExpiresDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              {/*Expires Date END */}
              {/* <div className="my-3 ml-24 flex justify-start gap-2 p-4">
                <Button className="bg-marine-300">
                  <ArrowBigLeft />
                </Button>
                <Button className="w-[150px] bg-marine-300">Make Ticket</Button>
              </div> */}
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <DialogClose asChild>
              <Button>Save</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTicket;
