import React from "react";

//components
import { Cropper, CropperRef } from "react-advanced-cropper";
import Modal from "./modal";
import { Props as ModalProps } from "react-modal";
import Button from "./button";

interface Props {
  cropperRef: React.Ref<CropperRef<object>>;
  cropperSrc: string | undefined;
  cropAspectRatio?: number;
  getCroppedImage(): void;
}

const CropperModal = ({ cropperSrc, cropperRef, cropAspectRatio, getCroppedImage, ...modalProps }: ModalProps & Props) => {
  return (
    <Modal {...modalProps}>
      <div className="flex flex-col gap-24">
        <p className="text-black-title font-medium text-base">Upload your photo</p>
        <div>
          <Cropper
            ref={cropperRef}
            src={cropperSrc}
            stencilProps={{
              aspectRatio: cropAspectRatio
            }}
          />
        </div>
        <div className="flex flex-nowrap justify-end gap-2">
          <Button variant="outlined" onClick={modalProps.onRequestClose}>
            Cancel
          </Button>
          <Button className="w-[160px] py-4" onClick={getCroppedImage}>
            Crop and save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CropperModal;
