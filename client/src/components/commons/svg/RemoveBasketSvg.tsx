import React from "react";
import { SvgIcons } from "./types";

export default function RemoveBasketSvg(props: SvgIcons) {
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
      <line
        fill="none"
        stroke={props.color}
        strokeWidth={props.stroke}
        strokeMiterlimit="10"
        x1="39"
        y1="44"
        x2="25"
        y2="30"
      />
      <line
        fill="none"
        stroke={props.color}
        strokeWidth={props.stroke}
        strokeMiterlimit="10"
        x1="25"
        y1="44"
        x2="39"
        y2="30"
      />
    </svg>
  );
}
