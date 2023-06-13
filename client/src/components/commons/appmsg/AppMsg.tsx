import React, { useEffect } from "react";
import scss from "./AppMsg.module.scss";
import { useAppDispatch } from "../../../hooks/redux.hook";
import { deleteMsg } from "../../../redux/slice/appSlice";

interface IPropsAppMsg {
  msg: { id: number; text: string }[];
}

export default function AppMsg({ msg }: IPropsAppMsg) {
  return (
    <div className={scss.appmsg}>
      {msg
        ? msg.map((e, i) => {
            return <Msg text={e.text} id={e.id} key={i} />;
          })
        : null}
    </div>
  );
}

interface IProprMsg {
  id: number;
  text: string;
}

function Msg({ id, text }: IProprMsg) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(deleteMsg(id)), 3000);
  }, []);

  return (
    <div className={scss.msgbox}>
      <div onClick={() => dispatch(deleteMsg(id))}>&times;</div>
      <div>{text}</div>
    </div>
  );
}
