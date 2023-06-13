import React, { PropsWithChildren } from "react";
import scss from "./LineiconsOptions.module.scss";

export default function LineiconsOptions({ children }: PropsWithChildren) {
  return <div className={scss.lineiconsoptions}>{children}</div>;
}
