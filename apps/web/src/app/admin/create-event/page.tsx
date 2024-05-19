"use client";

import Dropzone from "@/components/Dropzone";
import FormInput from "@/components/FormInput";
import FormTextArea from "@/components/FormTextarea";
import PreviewImages from "@/components/PreviewImage";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import useCreateEvent from "@/hooks/api/admin/useCreateEvent";
import { useAppSelector } from "@/redux/hooks";
import { IFormEvent } from "@/types/event.type";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { createEventValidationSchema } from "./schemas/createEventValidationSchema";
import AuthGuardOrganizer from "@/hoc/AuthGuardOrganizer";

const CreateEventPage = () => {
  const { createEvent } = useCreateEvent();
  const [isFree, setIsFree] = useState(false);
  const { id } = useAppSelector((state) => state.user);
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    values,
    errors,
    touched,
  } = useFormik<IFormEvent>({
    initialValues: {
      title: "",
      category: "",
      address: "",
      city: "",
      description: "",
      thumbnail: [],
      startDate: "",
      endDate: "",
      limit: "",
      price: "",
      discountName: "",
      discountLimit: "",
      discountValue: "",
      discountExpires: "",
    },
    validationSchema: createEventValidationSchema,
    onSubmit: (values) => {
      createEvent({ ...values, organizerId: id });
    },
  });
  console.log(values);
  
  useEffect(() => {
    // Saat nilai checkbox berubah, perbarui nilai isFree di formik
    setFieldValue("isFree", isFree);
  }, [isFree, setFieldValue]);

  const handleCheckboxChange = (e: any) => {
    setIsFree(e.target.checked);
  };

  return (
    <main className="container mx-auto bg-slate-100 px-4 md:bg-marine-100">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto w-full rounded-lg bg-slate-100 pr-2 md:max-w-6xl">
          <h1 className="mb-8 pt-6 text-center text-2xl  font-semibold md:mx-10 md:text-left md:text-4xl">
            Create a New Event
          </h1>
          <div className="grid md:grid-cols-2 md:gap-10 md:p-10">
            <div>
              {/* event details */}
              <h2 className="mb-3 font-sans text-xl md:text-2xl">
                Event Details
              </h2>
              <hr className="mb-3" />
              <div className="my-4 flex flex-col md:flex-row md:items-center">
                <Label className="mr-4 w-28 text-left">Title</Label>
                <div className="items-center md:flex-1">
                  <FormInput
                    name="title"
                    type="text"
                    label=""
                    placeholder="Title"
                    value={values.title}
                    error={errors.title}
                    isError={!!touched.title && !!errors.title}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* category */}
              <div className="my-4 flex flex-col md:flex-row md:items-center">
                <Label className="mr-4 w-28 text-left">Category</Label>
                <div className="items-center md:flex-1">
                  <FormInput
                    name="category"
                    type="text"
                    label=""
                    placeholder="Category"
                    value={values.category}
                    error={errors.category}
                    isError={!!touched.category && !!errors.category}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mx-auto flex w-[80%] items-center justify-center">
                <PreviewImages
                  fileImages={values.thumbnail}
                  onRemoveImage={(idx: number) =>
                    setFieldValue(
                      "thumbnail",
                      values.thumbnail.toSpliced(idx, 1),
                    )
                  }
                />
              </div>

              <div className="mx-auto w-[80%] items-center shadow-sm">
                <Dropzone
                  isError={Boolean(errors.thumbnail)}
                  label=""
                  onDrop={(files) =>
                    setFieldValue("thumbnail", [
                      ...values.thumbnail,
                      ...files.map((file) => file),
                    ])
                  }
                />
              </div>

              {/* Location */}

              <div className="my-4 flex flex-col md:flex-row md:items-center">
                <Label className="mr-4 w-28 text-left">Address</Label>
                <div className="items-center md:flex-1">
                  <FormInput
                    name="address"
                    label=""
                    error={errors.address}
                    isError={!!touched.address && !!errors.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="address"
                    type="text"
                    value={values.address}
                  />
                </div>
              </div>
              <div>
                <div className="my-4 flex flex-col md:flex-row md:items-center">
                  <Label className="mr-4 w-28 text-left">City</Label>
                  <div className="items-center md:flex-1">
                    <FormInput
                      name="city"
                      label=""
                      error={errors.city}
                      isError={!!touched.city && !!errors.city}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="city"
                      type="text"
                      value={values.city}
                    />
                  </div>
                </div>
              </div>

              <h2 className="mb-3 font-sans text-xl md:text-2xl">
                <hr className="mt-3" />
                Additional Information <hr className="mb-3" />
              </h2>
              <FormTextArea
                name="description"
                label=""
                error={errors.description}
                isError={!!touched.description && !!errors.description}
                handleBlur={handleBlur}
                handleChange={handleChange}
                placeholder="describe what's special about your event and other importan details here..."
                value={values.description}
              />
            </div>
            <div>
              {/* Date and Time */}
              <h2 className="mb-3 font-sans text-xl md:text-2xl">
                <hr className="mt-3 md:hidden" />
                Date & Time
                <hr className="mb-3 md:mt-3" />
              </h2>

              <div className="mt-6 flex flex-col justify-between gap-3 md:gap-5 lg:flex-row">
                <FormInput
                  name="startDate"
                  label="Start Date"
                  type="datetime-local"
                  placeholder="Start Date"
                  value={values.startDate}
                  error={errors.startDate as string}
                  isError={!!touched.startDate && !!errors.startDate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <FormInput
                  name="endDate"
                  label="End Date"
                  type="datetime-local"
                  placeholder="End Date"
                  value={values.endDate}
                  error={errors.endDate as string}
                  isError={!!touched.endDate && !!errors.endDate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
              <h2 className="mb-3 font-sans text-xl md:text-2xl">
                <hr className="mt-3" />
                Available Seat
                <hr className="mb-3" />
              </h2>
              <div className="my-4 flex flex-col md:flex-row md:items-center">
                <Label className="mr-4 w-28 text-left">Limit</Label>
                <div className="items-center md:flex-1">
                  <FormInput
                    name="limit"
                    label=""
                    type="text"
                    placeholder="Available Seats"
                    value={values.limit}
                    error={errors.limit as string}
                    isError={!!touched.limit && !!errors.limit}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="my-4 flex flex-col md:flex-row md:items-center">
                <Label className="mr-4 w-28 text-left">Price</Label>
                <div className="items-center md:flex-1">
                  <FormInput
                    name="price"
                    label=""
                    type="text"
                    placeholder="price"
                    value={values.price}
                    error={errors.price as string}
                    isError={!!touched.price && !!errors.price}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="">
                <Collapsible>
                  <CollapsibleTrigger>
                    <div className="flex justify-between  gap-3">
                      <h2 className="mb-3 font-sans text-xl md:text-2xl">
                        <hr className="mt-3 underline" />
                        Wanna Add Voucher?
                        <hr className="mb-3" />
                      </h2>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-4 flex items-center">
                      <Label className="mr-4 hidden w-28 text-left md:block">
                        Title
                      </Label>
                      <div className="flex-1">
                        <FormInput
                          name="discountName"
                          label=""
                          type="text"
                          placeholder="voucher Name"
                          value={values.discountName}
                          error={errors.discountName as string}
                          isError={
                            !!touched.discountName && !!errors.discountName
                          }
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center">
                      <Label className="mr-4 w-28 text-left">Limit</Label>
                      <div className="flex-1">
                        <FormInput
                          name="discountLimit"
                          label=""
                          type="text"
                          placeholder="Limit"
                          value={values.discountLimit}
                          error={errors.discountLimit as string}
                          isError={
                            !!touched.discountLimit && !!errors.discountLimit
                          }
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center">
                      <Label className="mr-4 w-28 text-left">Discount</Label>
                      <div className="flex-1">
                        <FormInput
                          name="discountValue"
                          label=""
                          type="text"
                          placeholder="IDR."
                          value={values.discountValue}
                          error={errors.discountValue as string}
                          isError={
                            !!touched.discountValue && !!errors.discountValue
                          }
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <Label className="mr-4 w-28 text-left">Expire Date</Label>
                      <div className="flex-1">
                        <FormInput
                          name="discountExpires"
                          label=""
                          type="date"
                          placeholder="dd/mmmm/yyyy"
                          value={values.discountExpires}
                          error={errors.discountExpires as string}
                          isError={
                            !!touched.discountExpires &&
                            !!errors.discountExpires
                          }
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              <div className="my-10 mt-4 flex justify-center lg:justify-end ">
                <Button disabled={false} type="submit" className=" text-white">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateEventPage;
