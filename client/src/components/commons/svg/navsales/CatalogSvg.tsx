import React from "react";
import { SvgIcons } from "./types";

export default function CatalogSvg({
  width = "40",
  height = "40",
  color = "#2D4B73",
  stroke = "2",
}: SvgIcons) {
  return (
    <svg
      width={height}
      height={width}
      viewBox="0 0 24 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L23 1.00002V25.2909L17.1091 31H1V1Z"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M4 6H20M4 10.5H20M4 15.5H20M4 20.5H20M4 25.5H15.5"
        stroke={color}
      />
    </svg>
  );
}
