"use client";

import React, { MouseEvent, memo, useCallback, useEffect, useRef, useState } from "react";

import { CropperRef } from "react-advanced-cropper";
// styles
import "react-advanced-cropper/dist/style.css";
import CropperModal from "./cropper-modal";

type OnChange = (v: File | null) => void | Promise<void> | boolean | Promise<boolean>;

type Props = {
  onChange: OnChange;
  onSrcChange?: (src: string) => void;
  src?: string;
  name?: string;
  children?: (src: string | undefined, openPicker: () => void, removeImage: () => void) => React.ReactElement;
  crop?: boolean;
  cropAspectRatio?: number;
  readonly?: boolean;
};

const ImagePicker = React.forwardRef<unknown, Props>(function ImagePicker(
  { onChange, onSrcChange, src, name, children, crop, cropAspectRatio, readonly, ...inputProps },
  ref
) {
  const [_src, setSrc] = useState(src);
  const inputRef = useRef<HTMLInputElement>(null);

  const { isCropperOpen, cropperRef, setCropperSrc, getCroppedImage, closeCropModal, cropperSrc, cropImageMimeType } =
    useCropperUtils(setSrc, onChange, onSrcChange);

  const handleSrcChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const isGif = file.type === "image/gif";
        const fileSrc = await getUploadedFileSrc(file);

        if (crop && !isGif) {
          setCropperSrc(fileSrc);
          // save mime type in order to use it when creating data url from canvas
          // to avoid type conversion (canvas gives png by default) and increasing of
          // result image's size
          cropImageMimeType.current = file.type || "image/jpeg";
        } else {
          const changeAccepted = onChange(file);
          if (changeAccepted === false) return;

          setSrc(fileSrc);
          if (onSrcChange) onSrcChange(fileSrc);
        }

        onChange(file);
        setSrc(fileSrc);
        if (onSrcChange) onSrcChange(fileSrc);
      }
    },
    [onChange, onSrcChange, crop, cropImageMimeType, setCropperSrc]
  );

  const handleClick = useCallback(() => {
    if (!readonly) inputRef.current?.click();
  }, [readonly]);

  const removeImage = useCallback(() => {
    onChange(null);
    setSrc(src);
  }, [src, onChange]);

  useEffect(() => setSrc(src), [src]);

  return (
    <>
      <input
        onChange={handleSrcChange}
        onClick={(e: MouseEvent<HTMLInputElement>) => {
          if ("value" in e.target) e.target.value = null;
        }}
        type="file"
        accept="image/*"
        ref={element => {
          if (typeof ref === "function") {
            ref(element);
          } else if (ref) {
            ref.current = element;
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (inputRef as any).current = element;
        }}
        hidden
        name={name}
        {...inputProps}
      />
      {children ? children(_src, handleClick, removeImage) : null}
      {isCropperOpen && (
        <CropperModal
          isOpen
          onRequestClose={closeCropModal}
          getCroppedImage={getCroppedImage}
          cropAspectRatio={cropAspectRatio}
          cropperRef={cropperRef}
          cropperSrc={cropperSrc}
        />
      )}
    </>
  );
});

function useCropperUtils(setSrc: (src: string) => void, onChange: OnChange, onSrcChange?: (src: string) => void) {
  const [cropperSrc, setCropperSrc] = useState<string | undefined>();
  const cropperRef = useRef<CropperRef>(null);
  const cropImageMimeType = useRef<string>();

  async function getCroppedImage() {
    if (cropperRef.current) {
      const newSrc = cropperRef.current.getCanvas()!.toDataURL(cropImageMimeType.current);

      // close cropper
      setCropperSrc(undefined);
      cropImageMimeType.current = undefined;

      const file = await createFileFromUrl(newSrc);
      const changeAccepted = onChange(file);
      if (changeAccepted === false) return;

      setSrc(newSrc);
      onSrcChange?.(newSrc);
    }
  }

  function closeCropModal() {
    setCropperSrc(undefined);
  }

  const isCropperOpen = Boolean(cropperSrc);

  return {
    cropperSrc,
    cropImageMimeType,
    isCropperOpen,
    cropperRef,
    setCropperSrc,
    getCroppedImage,
    closeCropModal
  };
}

export async function createFileFromUrl(url: string): Promise<File> {
  const result = await fetch(url);
  const blob = await result.blob();
  const file = new File([blob], "image.jpg", blob);
  return file;
}

async function getUploadedFileSrc(file: File): Promise<string> {
  const fileName: string = file.name.toLowerCase();
  if (fileName.endsWith(".heic") || fileName.endsWith(".heif")) {
    const formData = new FormData();
    formData.append("image", file);
    const convertedImage = await fetch("https://api.leanzer.com/utils/heic-to-jpg", {
      method: "POST",
      body: formData
    }).then(res => res.blob());
    return convertedImage ? URL.createObjectURL(convertedImage) : "";
  } else {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = onLoadEvent => {
        resolve(onLoadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
      reader.onerror = reject;
    });
  }
}

export default memo(ImagePicker);
