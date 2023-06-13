import React from "react";
import { SvgIcons } from "./types";

export default function DeleteFullSvg(props: SvgIcons) {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 64 64"
      enable-background="new 0 0 64 64"
    >
      <g>
        <polyline
          fill="none"
          stroke={props.color}
          stroke-width="3"
          stroke-miterlimit="10"
          points="52,36 58,34 62,48 56,50 	"
        />
        <rect
          x="10"
          y="13"
          fill="none"
          stroke={props.color}
          stroke-width="3"
          stroke-miterlimit="10"
          width="36"
          height="50"
        />
        <line
          fill="none"
          stroke={props.color}
          stroke-width="3"
          stroke-miterlimit="10"
          x1="22"
          y1="22"
          x2="22"
          y2="56"
        />
        <line
          fill="none"
          stroke={props.color}
          stroke-width="3"
          stroke-miterlimit="10"
          x1="34"
          y1="22"
          x2="34"
          y2="56"
        />
        <line
          fill="none"
          stroke={props.color}
          stroke-width="3"
          stroke-miterlimit="10"
          x1="47.926"
          y1="21.895"
          x2="60"
          y2="63"
        />
      </g>
      <polyline
        fill="none"
        stroke={props.color}
        stroke-width="3"
        stroke-miterlimit="10"
        points="12,13 14,6 22.857,6.143 25,13 "
      />
      <polyline
        fill="none"
        stroke={props.color}
        stroke-width="3"
        stroke-miterlimit="10"
        points="22.857,6.143 27,1 39,1 44,13 "
      />
    </svg>
  );
}
