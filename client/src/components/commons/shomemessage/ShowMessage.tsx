import React from "react";
import scss from "./ShowMessage.module.scss";
interface IPropsShowMessage {
  title: string;
}
export default function ShowMessage({ title }: IPropsShowMessage) {
  return <div className={scss.showmessage}>{title}</div>;
}
