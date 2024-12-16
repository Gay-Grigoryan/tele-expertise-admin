import React from "react";

interface PulseLayer {
  className: string;
  size: number;
}

interface Props {
  layers: PulseLayer[];
}

function Pulse({ layers }: Props) {
  const size = layers[layers.length - 1].size;
  return (
    <div className="relative aspect-square" style={{ width: size }}>
      {layers.toReversed().map((layer, index) => (
        <div
          key={index}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full ${layer.className} animate-pulse`}
          style={{
            width: layer.size,
            height: layer.size
          }}
        />
      ))}
    </div>
  );
}

export default Pulse;
