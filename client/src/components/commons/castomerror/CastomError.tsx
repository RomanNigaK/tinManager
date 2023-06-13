import React, { PropsWithChildren } from "react";
import scss from "./Castomerror.module.scss";

export default function CastomError({ children }: PropsWithChildren) {
  return <div className={scss.error}>{children}</div>;
}
