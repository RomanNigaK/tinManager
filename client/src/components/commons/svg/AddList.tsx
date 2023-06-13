import React from "react";
import { SvgIcons } from "./types";

export default function AddList(props: SvgIcons) {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
    >
      <g>
        <polygon
          fill="none"
          stroke={props.color}
          strokeWidth={props.stroke}
          strokeMiterlimit="10"
          points="23,1 55,1 55,63 9,63 9,15 	"
        />
        <polyline
          fill="none"
          stroke={props.color}
          strokeWidth={props.stroke}
          strokeMiterlimit="10"
          points="9,15 23,15 23,1 	"
        />
      </g>
      <polyline
        fill="none"
        stroke={props.color}
        strokeWidth={props.stroke}
        strokeLinejoin="bevel"
        strokeMiterlimit="10"
        points="40,37 32,45 
	24,37 "
      />
      <g>
        <line
          fill="none"
          stroke={props.color}
          strokeWidth={props.stroke}
          strokeMiterlimit="10"
          x1="32"
          y1="45"
          x2="32"
          y2="25"
        />
      </g>
    </svg>
  );
}
