import Image from "next/image";
import React from "react";

interface Props {
  onFilesChange: (value: File[]) => void;
  onImagesChange: (value: string[]) => void;
}
export default function MultipleImagePicker({ onFilesChange, onImagesChange }: Props) {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = files.map(file => URL.createObjectURL(file));
      onFilesChange(files);
      onImagesChange(newImages);
      e.target.value = "";
    }
  };

  return (
    <div>
      <label htmlFor="picker">
        <Image
          src="/images/upload-image-placeholder.png"
          width={120}
          height={120}
          alt="image picker"
          className="cursor-pointer rounded-lg"
        />
      </label>
      <input type="file" multiple accept="image/*" id="picker" name="picker" onChange={handleImageChange} className="hidden" />
    </div>
  );
}
