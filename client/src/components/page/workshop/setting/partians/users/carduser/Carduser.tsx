import React, { useRef } from "react";
import scss from "./Carduser.module.scss";
import avatar from "@public/icons/avatar.svg";
import { User } from "redux/slice/userSlice";
import { useDrag } from "react-dnd";
import { useAppSelector } from "@castomhooks/redux.hook";
import { selectorUser } from "redux/selectors";

export default function Carduser({
  nameUser,
  senameUser,
  access,
  login,
  id,
}: Pick<User, "nameUser" | "senameUser" | "access" | "login" | "id">) {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "user",
    item: { id },
    end: () => {},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  drag(ref);

  return (
    <div className={scss.carduser} ref={ref}>
      <div className={scss.avatar}>
        <img src={avatar} alt="" />
      </div>
      <div className={scss.info}>
        <div className={scss.name}>
          <div className={scss.name}>{nameUser}</div>
          <div className={scss.sename}>{senameUser}</div>
        </div>

        <div className={scss.access}>{access}</div>
        <div className={scss.login}>{login}</div>
      </div>
    </div>
  );
}
