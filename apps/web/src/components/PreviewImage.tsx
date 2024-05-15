'use client';

import { appConfig } from '@/utils/config';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { FC, useMemo } from 'react';
import { Button } from './ui/button';

interface PreviewImagesProps {
  fileImages?: File[];
  images?: string[];
  onRemoveImage: (index: number) => void;
}

const PreviewImages: FC<PreviewImagesProps> = ({
  onRemoveImage,
  fileImages,
  images,
}) => {
  const imageResults = useMemo(() => {
    if (fileImages) {
      return fileImages.map((image) => URL.createObjectURL(image));
    }
    return images;
  }, [fileImages, images]);

  return (
    <div className="flex gap-4">
      {imageResults?.map((image, index) => {
        return (
          <div
            key={index}
            className="relative h-[350px] w-[350px]"
          >
            <Image
              src={images ? `${appConfig.baseURL}/${image}` : image}
              alt="thumbnail"
              objectFit="contain"
              fill
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-5 -top-5"
              onClick={() => onRemoveImage(index)}
            >
              <Trash2 className="h-6 w-6" />
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default PreviewImages;
