import React from "react";
import { SvgIcons } from "./types";

export default function Favourites({
  width = "40",
  height = "40",
  color = "#2D4B73",
  stroke = "2",
}: SvgIcons) {
  return (
    <svg
      width={height}
      height={width}
      viewBox="0 0 24 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 31V1H23V31L12 20.9305L1 31Z"
        fill="#FFFCFC"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
}
