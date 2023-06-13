import React, { PropsWithChildren } from "react";
import scss from "./GroupFilters.module.scss";
export default function GroupFilters({ children }: PropsWithChildren) {
  return <div className={scss.groupfilters}>{children}</div>;
}
