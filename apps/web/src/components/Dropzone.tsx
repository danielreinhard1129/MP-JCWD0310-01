'use client';

import { FC } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { Label } from './ui/label';
import { SlCloudUpload } from "react-icons/sl";

interface DropzoneProps {
  label: string;
  isError: boolean;
  onDrop: (files: FileWithPath[]) => void;
}

const Dropzone: FC<DropzoneProps> = ({ isError, label, onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
  });

  return (
    <div className="space-y-1.5">
      <Label className={isError ? 'text-red-500' : ''}>{label}</Label>
      <div
        {...getRootProps({
          className: 'p-10 border flex justify-center rounded-md',
        })}
      >
        <input {...getInputProps()}/>
        <Label className="flex flex-col items-center text-base cursor-pointer">
        <SlCloudUpload size="25px" />
          Drag pictures here 
        </Label>
      </div>
      {isError && (
        <div className="text-xs text-red-500">{label} is Required</div>
      )}
    </div>
  );
};

export default Dropzone;
