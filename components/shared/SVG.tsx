import { FC } from "react";

type SVGProps = {
  name: string;
  width?: number;
  height?: number;
  size?: number;
  className?: string;
  color?: string;
  fillColor?: string;
};

export const SVG: FC<SVGProps> = ({
  name,
  size,
  width,
  height,
  className,
  color,
  fillColor,
}) => {
  const widthValue = width || size || 16;
  const heightValue = height || size || 16;

  return (
    <svg
      width={widthValue}
      height={heightValue}
      className={className}
      style={{
        color: color || "inherit",
        fill: fillColor || "none",
        width: size || widthValue,
        height: size || heightValue,
      }}
      aria-hidden="true"
      focusable="false"
    >
      <use href={`/assets/sprite.svg#${name}`} />
    </svg>
  );
};
