"use client";
import React, { useEffect, useState } from "react";
import MultipleImagePicker from "./multiple-image-picker";
import Image from "next/image";
import Icon from "./icon";
import { getFile } from "../lib";

interface Props {
  onFilesChange: React.Dispatch<React.SetStateAction<{ id: number; file: File }[]>>;
  defaultImages?: { id: number; image: string }[];
  onDeletableImagesIdChange?: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function ImagesPickerSection({ onFilesChange, defaultImages, onDeletableImagesIdChange }: Props) {
  const [images, setImages] = useState<{ id: number; image: string }[]>([]);

  const removeImage = (id: number, isFromServer: boolean) => {
    if (isFromServer) {
      setImages(prev => prev.filter(el => el.id !== id));
      onDeletableImagesIdChange?.(prev => [...prev, id]);
    } else {
      onFilesChange(prev => prev.filter(el => el.id !== id));
      setImages(prev => prev.filter(el => el.id !== id));
    }
  };

  useEffect(() => {
    if (defaultImages) setImages(defaultImages.map(el => ({ ...el, image: getFile(el.image) })));
  }, [defaultImages]);

  return (
    <div className="flex flex-1 flex-col gap-3 rounded-lg bg-white p-4">
      <div className="flex flex-col gap-2">
        <p className="font-regular text-p1 text-black">Նկարներ</p>
        <p className="font-regular text-p2 text-black/70">Առաջին ավելացրած նկարը կընդունվի որպես գլխավոր*</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <MultipleImagePicker
          onImagesChange={newImages =>
            setImages(prev => [
              ...prev,
              ...newImages.map((el, i) => ({ image: el, id: (prev[prev.length - 1]?.id || 0) + i + 1 }))
            ])
          }
          onFilesChange={files =>
            onFilesChange(prev => [...prev, ...files.map((file, i) => ({ file, id: (prev[prev.length - 1]?.id || 0) + i + 1 }))])
          }
        />
        {images.map(image => {
          const isFromServer = image.image.includes(process.env.NEXT_PUBLIC_FILE_HOST || "");

          return (
            <div className="group relative" key={image.id}>
              <Image
                className="rounded-lg"
                src={image.image}
                width={120}
                height={120}
                style={{ height: 120, objectFit: "cover", backgroundPosition: "center" }}
                alt="picked image"
              />

              <div
                className="absolute -right-1 -top-1 hidden cursor-pointer rounded-full bg-black p-1 group-hover:block"
                onClick={() => removeImage(image.id, isFromServer)}
              >
                <Icon name="close-white" size={8} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
