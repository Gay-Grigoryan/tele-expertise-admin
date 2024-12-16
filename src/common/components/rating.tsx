import React from "react";
import Icon from "./icon";

interface Props {
  containerClassName?: string;
  maxStars: number;
  rating: number | null;
  star_width: number;
  star_height: number;
  onStarClick?(index: number): void;
}

export default function Rating({ containerClassName, maxStars, star_height, star_width, rating, onStarClick }: Props) {
  return (
    <div className={`flex space-x-2 ${containerClassName}`}>
      {new Array(maxStars).fill(0).map((_, i) => (
        <button type="button" onClick={() => onStarClick?.(i + 1)} key={`rating-star-item-${Math.random()}`}>
          <Icon name={i + 1 <= (rating || 0) ? "star-filled" : "star"} width={star_width} height={star_height} />
        </button>
      ))}
    </div>
  );
}
