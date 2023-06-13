import React from "react";
import { SvgIcons } from "./types";

export default function AttentionSvg(props: SvgIcons) {
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
      <path
        fill="none"
        stroke={props.color}
        strokeWidth={props.stroke}
        strokeMiterlimit="10"
        d="M53.92,10.081c12.107,12.105,12.107,31.732,0,43.838
	c-12.106,12.108-31.734,12.108-43.84,0c-12.107-12.105-12.107-31.732,0-43.838C22.186-2.027,41.813-2.027,53.92,10.081z"
      />
      <line
        stroke={props.color}
        strokeWidth={props.stroke}
        strokeMiterlimit="10"
        x1="32"
        y1="47"
        x2="32"
        y2="25"
      />
      <line
        stroke={props.color}
        strokeWidth={props.stroke}
        strokeMiterlimit="10"
        x1="32"
        y1="21"
        x2="32"
        y2="17"
      />
    </svg>
  );
}
