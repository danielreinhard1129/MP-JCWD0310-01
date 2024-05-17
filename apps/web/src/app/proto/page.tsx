"use client";
import AddTicket from "@/components/AddTicket";
import Autocomplete from "@/components/Autocomplete";
import FormInput from "@/components/FormInput";
import FormLocation from "@/components/FormLocation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { FormikHandlers, useFormik } from "formik";
import * as React from "react";
import { HTMLInputTypeAttribute } from "react";
import { GrMap } from "react-icons/gr";

interface FormLocationProps {
  name: string;
  label: string;
  placeholder: string;
  error: string | undefined;
  isError: boolean;
  onChange: (location: string) => void; // Mengubah type dari onChange untuk menerima lokasi string
  onBlur: FormikHandlers["handleBlur"];
  value: string;
  type: HTMLInputTypeAttribute;
  disabled: boolean;
}

interface VoucherFormData {
  title: string;
  limit: number;
  discount: number;
  expires: Date;
}

const FormTicket = () => {
  const [date, setDate] = React.useState<Date>();
  const [formVoucher, setFormVoucher] = React.useState<VoucherFormData>({
    title: '',
    limit: 0,
    discount: 0,
    expires: new Date(),
  });
  
  
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      location: "",
      ticket: "",
      ticketName: "",
      ticketPrice: "",
      ticketCategory: "",
      availableSeats: "",
      ticketStart: null,
      ticketExpires: null,
      voucherTitle: "",
      voucherLimit: "",
      voucherDiscount: "",
      voucherExpires: null,
      place: "",
      address: "",
      city: "",
      province: "",
    },
    onSubmit: (values) => {},
  });

  const [location, setLocation] = React.useState("");

  const handleChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
  };

  const handleSave = () => {
    const { place, address, city, province } = values;
    setLocation(`${place}, ${address}, ${city}, ${province}`);
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const handleVoucherChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormVoucher(prevState => ({
      ...prevState,
      [name]: name === 'voucherLimit' || name === 'voucherDiscount' ? parseFloat(value) : value,
    }));
  };

  const handleVoucherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log(formVoucher);
    setIsOpen(false);
  };

  return (
    <div>
      {/* TICKET FORM */}
      <div>
        <div className="my-2 flex h-[54px] w-full  flex-col rounded-sm px-0 py-2">
          <Label htmlFor="ticket" className="text-sm"></Label>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="mx-auto flex h-12 w-[200px] justify-center rounded-sm bg-marine-100 pl-4 text-center"
                variant="outline"
              >
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
                  <div className="my-3 grid items-center gap-4">
                    <FormInput
                      name="ticketName"
                      type="text"
                      label="Ticket Name"
                      placeholder="N"
                      value={values.ticketName}
                      error={errors.ticketName}
                      isError={!!touched.ticketName && !!errors.ticketName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // disabled={false}
                    />

                    <div>
                      <Label htmlFor="jumlah" className="text-right">
                        Category
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select Category" />
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

                    <FormInput
                      name="ticketPrice"
                      type="text"
                      label="Ticket Price"
                      placeholder="IDR"
                      value={values.ticketPrice}
                      error={errors.ticketPrice}
                      isError={!!touched.ticketPrice && !!errors.ticketPrice}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // disabled={false}
                    />
                    <div className="flex gap-2 ">
                      <Label htmlFor="isFree" className="my-auto text-right">
                        Free Ticket
                      </Label>
                      <Checkbox
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="border-primary-500 mr-2 h-5 w-5 border-2"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="detail">
                  <div>
                    <p className="text-xs">
                      The maximum sale date depends on the end date of the
                      event.
                    </p>
                  </div>
                  <div className="my-3 grid items-center gap-4">
                    <FormInput
                      name="availableSeats"
                      type="text"
                      label="Available Seats"
                      placeholder="Seats"
                      value={values.availableSeats}
                      error={errors.availableSeats}
                      isError={
                        !!touched.availableSeats && !!errors.availableSeats
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // disabled={false}
                    />

                  </div>
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
      </div>
      {/* VOUCHER FORM */}
      <div>
        <div className="my-2 flex h-[54px] w-full  flex-col rounded-sm px-0 py-2">
          <Label htmlFor="ticket" className="text-sm"></Label>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="mx-auto flex h-12 w-[200px] justify-center rounded-sm bg-marine-100 pl-4 text-center"
                variant="outline"
              >
                Add Voucher
              </Button>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle className="mx-auto text-gray-500">
                  Event Voucher
                </DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Fill in the Form bellow to make a voucher for your Customers.
                Click save when you're done.
              </DialogDescription>
              <div className="grid gap-4 py-4">
                <FormInput
                  name="voucherTitle"
                  type="text"
                  label="Voucher Title"
                  placeholder="Voucher Title"
                  value={values.voucherTitle}
                  error={errors.voucherTitle}
                  isError={!!touched.voucherTitle && !!errors.voucherTitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // disabled={false}
                />

                <div className="grid grid-cols-2 items-center gap-4">
                  <FormInput
                    name="voucherLimit"
                    type="text"
                    label="Available Voucher"
                    placeholder="amount"
                    value={values.voucherLimit}
                    error={errors.voucherLimit}
                    isError={!!touched.voucherLimit && !!errors.voucherLimit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // disabled={false}
                  />

                  <FormInput
                    name="voucherDiscount"
                    type="text"
                    label="Discount Amount"
                    placeholder="IDR"
                    value={values.voucherDiscount}
                    error={errors.voucherDiscount}
                    isError={
                      !!touched.voucherDiscount && !!errors.voucherDiscount
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // disabled={false}
                  />
                </div>
                
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Save</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div>
        <AddTicket
          label=""
          placeholder=""
          name=""
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.ticket}
          error={errors.ticket}
          isError={!!touched.ticket && !!errors.ticket}
          disabled={false}
          // className={isError ? 'border-red-600' : 'bg-marine-100'}
        />
      </div>

      {/* FORM LOCATION MANUAL */}
      <div>
        <div className="my-2 flex h-[54px] w-full  flex-col rounded-sm px-0 py-2">
          <Label className="">Location</Label>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="mr-5 flex h-12 w-full flex-row items-center justify-start rounded-sm bg-marine-100 pl-4 text-left font-normal"
                variant="outline"
              >
                <GrMap className="mr-3 h-12 w-4" onBlur={handleBlur} />{" "}
                {location ? location : "location"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="mx-auto text-gray-500">
                  Location
                </DialogTitle>
                <DialogDescription>
                  Make sure your location & Address Clear. Click save when
                  you're done.
                </DialogDescription>
              </DialogHeader>
              <div>
                <div className="my-4 flex h-[54px] w-full  flex-col rounded-sm px-0 py-2">
                  <FormInput
                    name="place"
                    type="text"
                    label="Place"
                    placeholder="Place"
                    value={values.place}
                    error={errors.place}
                    isError={!!touched.place && !!errors.place}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // disabled={false}
                  />
                </div>
                <div className="my-4 flex h-[54px] w-full  flex-col rounded-sm px-0 py-2">
                  <FormInput
                    name="address"
                    type="text"
                    label="Address"
                    placeholder="Address"
                    value={values.address}
                    error={errors.address}
                    isError={!!touched.address && !!errors.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // disabled={false}
                  />
                </div>
                <div className="my-4 flex h-[54px] w-full  flex-col rounded-sm px-0 py-2">
                  <FormInput
                    name="city"
                    type="text"
                    label="City"
                    placeholder="City"
                    value={values.city}
                    error={errors.city}
                    isError={!!touched.city && !!errors.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // disabled={false}
                  />
                </div>
                <div className="my-4 flex h-[54px] w-full  flex-col rounded-sm px-0 py-2">
                  <FormInput
                    name="province"
                    type="text"
                    label="Province"
                    placeholder="Province"
                    value={values.province}
                    error={errors.province}
                    isError={!!touched.province && !!errors.province}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // disabled={false}
                  />
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
      </div>

      {/* FORM LOCATION COMPONENT */}
      <div>
        <FormLocation
          name="location"
          type="text"
          label="Location"
          placeholder="Event Location"
          error={errors.location}
          isError={!!touched.location && !!errors.location}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.location}
          disabled={false}
        />
      </div>

      {/* FORM VOUCHER COMPONENT */}
      <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setIsOpen(true)}>Create Voucher</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Voucher</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" id="title" name="voucherTitle" value={formVoucher.title} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
              </div>
              <div>
                <label htmlFor="limit" className="block text-sm font-medium text-gray-700">Limit</label>
                <input type="number" id="limit" name="voucherLimit" value={formVoucher.limit} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
              </div>
              <div>
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount</label>
                <input type="number" id="discount" name="voucherDiscount" value={formVoucher.discount} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
              </div>
              <div>
                <label htmlFor="expires" className="block text-sm font-medium text-gray-700">Expires</label>
                <input type="date" id="expires" name="voucherExpires" value={formVoucher.expires.toISOString().substr(0, 10)} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
              </div>
            </div>
            <DialogFooter className="sm:justify-start mt-4">
              <Button type="submit">Create</Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      </div>
      <Autocomplete/>
      

      <div className="w-screen bg-marine-200 h-60">
        <div className="flex flex-row gap-8 justify-center mx-auto">
          <div className="w-[100px] h-[100px] rounded-full bg-slate-300"></div>
          <div className="w-[100px] h-[100px] rounded-full bg-slate-300"></div>
          <div className="w-[100px] h-[100px] rounded-full bg-slate-300"></div>
          <div className="w-[100px] h-[100px] rounded-full bg-slate-300"></div>
          <div className="w-[100px] h-[100px] rounded-full bg-slate-300"></div>
        </div>
      </div>
    </div>
  );
};
export default FormTicket;
