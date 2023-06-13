import React from "react";
import { SvgIcons } from "./types";

export default function DeleteAllSvg(props: SvgIcons) {
  return (
    <div title="Удалить">
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
            stroke-width="2"
            stroke-miterlimit="10"
            points="25,8 25,1 39,1 39,8 	"
          />
          <polyline
            fill="none"
            stroke={props.color}
            stroke-width="2"
            stroke-miterlimit="10"
            points="14,10 14,63 50,63 50,10 	"
          />
          <line
            fill="none"
            stroke={props.color}
            stroke-width="2"
            stroke-miterlimit="10"
            x1="10"
            y1="9"
            x2="54"
            y2="9"
          />
        </g>
        <line
          fill="none"
          stroke={props.color}
          stroke-width="2"
          stroke-miterlimit="10"
          x1="39"
          y1="43"
          x2="25"
          y2="29"
        />
        <line
          fill="none"
          stroke={props.color}
          stroke-width="2"
          stroke-miterlimit="10"
          x1="25"
          y1="43"
          x2="39"
          y2="29"
        />
      </svg>
    </div>
  );
}
