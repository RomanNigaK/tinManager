import React from "react";
import { SvgIcons } from "./types";

export default function DeleteSvg(props: SvgIcons) {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      width={props.height}
      height={props.width}
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
    >
      <g>
        <polyline
          fill="none"
          stroke={props.color}
          strokeWidth="3"
          strokeMiterlimit="10"
          points="25,8 25,1 39,1 39,8 	"
        />
        <polyline
          fill="none"
          stroke={props.color}
          strokeWidth="3"
          strokeMiterlimit="10"
          points="14,10 14,63 50,63 50,10 	"
        />
        <line
          fill="none"
          stroke={props.color}
          strokeWidth="3"
          strokeMiterlimit="10"
          x1="26"
          y1="20"
          x2="26"
          y2="54"
        />
        <line
          fill="none"
          stroke={props.color}
          strokeWidth="3"
          strokeMiterlimit="10"
          x1="38"
          y1="20"
          x2="38"
          y2="54"
        />
        <line
          fill="none"
          stroke={props.color}
          strokeWidth="3"
          strokeMiterlimit="10"
          x1="10"
          y1="9"
          x2="54"
          y2="9"
        />
      </g>
    </svg>
  );
}
