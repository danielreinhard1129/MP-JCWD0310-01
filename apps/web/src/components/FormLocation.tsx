"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormikHandlers } from "formik";
import React, { HTMLInputTypeAttribute, useState } from "react";
import { GrMap } from "react-icons/gr";

interface FormLocationProps {
    name: string;
    label: string;
    placeholder: string
    error: string | undefined;
    isError: boolean;
    onChange: (location: string) => void; // Mengubah type dari onChange untuk menerima lokasi string
    onBlur: FormikHandlers['handleBlur'];
    value: string;
    type: HTMLInputTypeAttribute;
    disabled: boolean
  }
const FormLocation : React.FC<FormLocationProps> = ({
    label,
    name,
    placeholder,
    onBlur,
    onChange,
    error,
    isError,
    value,
    type = 'text',
    disabled = false
  }) => {
    const [locationInput, setLocationInput] = useState({
        name: "",
        address: "",
        city: "",
        province: "",
      });
      
      const [savedLocation, setSavedLocation] = useState<string | null>(null);
     

      const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: string
      ) => {
        const { value } = e.target;
        setLocationInput((prevInput) => ({
          ...prevInput,
          [key]: value,
        }));
      };

      const handleSave = () => {
        // Simpan data yang diinput
        setSavedLocation(
          `${locationInput.name}, ${locationInput.address}, ${locationInput.city}, ${locationInput.province}`
        );
        // Tutup dialog
        
      };
  return (
    <div className="my-2 flex h-[54px] w-full  flex-col rounded-sm px-0 py-2">
      <Label htmlFor={name} className={isError ? "text-red-600" : "text-sm"}>
        {label}
      </Label>
      <Dialog >
        <DialogTrigger asChild>
          <Button className="flex h-12 flex-row items-center justify-start rounded-sm bg-marine-100 pl-4 mr-5 text-left font-normal w-full" variant="outline">
            <GrMap className="h-12 w-4 mr-3"  onBlur={onBlur}/> {savedLocation ? savedLocation : placeholder}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mr-2 h-12 w-4 text-gray-500">{label}</DialogTitle>
            <DialogDescription>
              Make sure your location & Address Clear. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Place
              </Label>
              <Input id="name"
                value={locationInput.name}
                onBlur={onBlur}
                type={type}
                onChange={(e) => handleInputChange(e, "name")}
                disabled = {disabled}
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input id="address"
                value={locationInput.address}
                onBlur={onBlur}
                type={type}
                onChange={(e) => handleInputChange(e, "address")}
                disabled = {disabled}
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                City
              </Label>
              <Input id="city"
                value={locationInput.city}
                onBlur={onBlur}
                type={type}
                onChange={(e) => handleInputChange(e, "city")}
                disabled = {disabled}
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="province" className="text-right">
                Province
              </Label>
              <Input id="province"
                value={locationInput.province}
                onBlur={onBlur}
                type={type}
                disabled = {disabled}
                onChange={(e) => handleInputChange(e, "province")}
                className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSave}>Save</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormLocation;
