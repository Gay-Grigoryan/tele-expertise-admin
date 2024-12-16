import React from "react";
import Modal from "./modal";
import Icon from "./icon";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import Image from "next/image";
import { getFile } from "../lib";
import IconButton from "./icon-button";

interface Props {
  images: { id: number; file: string }[];
  activeImageId: number;
  onClose: () => void;
}

export default function ImagesPreviewModal({ images, activeImageId, onClose }: Props) {
  return (
    <Modal isOpen>
      <div className="flex h-screen w-screen flex-col gap-[100px] bg-white pb-[90px]">
        <div className="flex justify-end pr-10 pt-10">
          <div className="cursor-pointer" onClick={onClose}>
            <Icon name="close" size={24} />
          </div>
        </div>
        <div>
          <Swiper spaceBetween={12} defaultValue={activeImageId} slidesPerView={3}>
            {images.map((image, i) => (
              <SwiperSlide key={`${image.id}_${i}`} className="!h-[480px]">
                <Image objectFit="cover" src={getFile(image.file)} fill alt="previewed image" />
              </SwiperSlide>
            ))}
            <SwiperNavigation />
          </Swiper>
        </div>
      </div>
    </Modal>
  );
}

const SwiperNavigation = () => {
  const swiper = useSwiper();
  return (
    <div className="flex justify-center gap-2 pt-[104px]">
      <IconButton
        name="arrow-left"
        variant="outlined"
        color="black"
        size={16}
        className="rounded-lg border border-gray-dark"
        onClick={() => swiper.slidePrev()}
      />
      <IconButton
        name="arrow-right"
        variant="outlined"
        color="black"
        size={16}
        className="rounded-lg border border-gray-dark"
        onClick={() => swiper.slideNext()}
      />
    </div>
  );
};
