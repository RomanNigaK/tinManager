import React from "react";
import { SvgIcons } from "./types";

export default function HistorySvg({
  width = "40",
  height = "40",
  color = "#2D4B73",
  stroke = "2",
}: SvgIcons) {
  return (
    <svg
      width={height}
      height={width}
      viewBox="0 0 29 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.3014 21.6767C11.3014 17.0799 15.0395 13.3534 19.6507 13.3534C24.2619 13.3534 28 17.0799 28 21.6767C28 26.2735 24.2619 30 19.6507 30C18.5435 30 17.4866 29.7851 16.5197 29.395C15.7286 29.0757 14.9977 28.6391 14.3488 28.1068M11.3014 21.6767L13.3887 20.2895M11.3014 21.6767L9.21403 20.2895M19.6507 15.0874V21.6767L23.1296 25.1447M21.5254 10.2322L21.5254 1.00002L1 1V27.7876H10.393M4.82677 5.72373H17.6986M4.82677 9.53857H17.6986M4.82677 13.3534H11.7845M4.82677 16.8215H8.30565"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
}
