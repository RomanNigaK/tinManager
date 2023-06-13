import React from "react";
import { SvgIcons } from "./types";

export default function CloseRound(props: SvgIcons) {
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
        <line
          fill="none"
          stroke={props.color}
          strokeWidth={props.stroke}
          strokeMiterlimit="10"
          x1="18.947"
          y1="17.153"
          x2="45.045"
          y2="43.056"
        />
      </g>
      <g>
        <line
          fill="none"
          stroke={props.color}
          strokeWidth={props.stroke}
          strokeMiterlimit="10"
          x1="19.045"
          y1="43.153"
          x2="44.947"
          y2="17.056"
        />
      </g>
      <g>
        <circle
          fill="none"
          stroke={props.color}
          strokeWidth={props.stroke}
          strokeMiterlimit="10"
          cx="32"
          cy="32"
          r="30.999"
        />
      </g>
    </svg>
  );
}
