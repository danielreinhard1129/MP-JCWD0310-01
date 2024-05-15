"use client";

import Dropzone from "@/components/Dropzone";
import FormInput from "@/components/FormInput";
import FormTextArea from "@/components/FormTextarea";
import PreviewImages from "@/components/PreviewImage";
import { Button } from "@/components/ui/button";
import useCreateEvent from "@/hooks/api/admin/useCreateEvent";
import { useAppSelector } from "@/redux/hooks";
import { IFormEvent } from "@/types/event.type";
import { createEventValidationSchema } from "./schemas/createEventValidationSchema";
import { useFormik } from "formik";

const CreateEventPage = () => {
  const { createEvent } = useCreateEvent();
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
      city:"",
      description: "",
      thumbnail: [],
      startDate: "",
      endDate: "",
      price: "",
      limit: "",
    },
    validationSchema: createEventValidationSchema,
    onSubmit: (values) => {
      createEvent({ ...values, organizerId: id });
    },
  });
  console.log(errors);

  return (
    <main className="container mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto flex max-w-5xl flex-col gap-5 lg:px-20">
          <h1 className="mb-4 mt-14 text-2xl font-bold">Create Event</h1>
          <div className=" flex flex-col gap-5 md:flex-row md:justify-between">
            <FormInput
              name="title"
              type="text"
              label="Title"
              placeholder="Title"
              value={values.title}
              error={errors.title}
              isError={!!touched.title && !!errors.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <FormInput
              name="category"
              type="text"
              label="Category"
              placeholder="Category"
              value={values.category}
              error={errors.category}
              isError={!!touched.category && !!errors.category}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <PreviewImages
            fileImages={values.thumbnail}
            onRemoveImage={(idx: number) =>
              setFieldValue("thumbnail", values.thumbnail?.toSpliced(idx, 1))
            }
          />
          <Dropzone
            isError={Boolean(errors.thumbnail)}
            label="Event Picture"
            onDrop={(files) =>
              setFieldValue("thumbnail", [
                ...values.thumbnail,
                ...files.map((file) => file),
              ])
            }
          />

          {/* <Dropdown
          label="Category"
          /> */}
          <div className="mt-4">
            <h3 className="font-semibold">Time and Location</h3>
          </div>
          <div className="flex flex-col gap-5 md:grid md:grid-cols-2 md:justify-between">
          <FormInput
              name="startDate"
              type="datetime-local"
              label="Start Date"
              placeholder="Start Date"
              value={values.startDate}
              error={errors.startDate}
              isError={!!touched.startDate && !!errors.startDate}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <FormInput
              name="endDate"
              type="datetime-local"
              label="End Date"
              placeholder="End Date"
              value={values.endDate}
              error={errors.endDate}
              isError={!!touched.endDate && !!errors.endDate}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            
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
            />

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
            />
          </div>

          <div className="my-5">
            <FormTextArea
              name="description"
              label="Description"
              placeholder="Description"
              value={values.description}
              error={errors.description}
              isError={!!touched.description && !!errors.description}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </div>

          <div>
            <div>
              <FormInput
                name="limit"
                type="text"
                label="Limit"
                placeholder="Limit"
                value={values.limit}
                error={errors.limit}
                isError={!!touched.limit && !!errors.limit}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <FormInput
                name="price"
                type="text"
                label="Price"
                placeholder="Price"
                value={values.price}
                error={errors.price}
                isError={!!touched.price && !!errors.price}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {/* Ticket FORM */}

            {/* Voucher FORM */}
          </div>
        </div>
        <div className="mb-16 flex justify-center">
          <Button className="md:w-[400px]" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </main>
  );
};

export default CreateEventPage;
