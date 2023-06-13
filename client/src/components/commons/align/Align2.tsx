import React, { CSSProperties, PropsWithChildren } from "react";
interface IPropsAlign extends PropsWithChildren {
  side?: "left" | "right" | "center" | "space-between";
}
export function Align2({ side = "center", children }: IPropsAlign) {
  let style: CSSProperties = {
    display: "flex",
    justifyContent: side,
  };
  return <div style={style}>{children}</div>;
}
