import React, { useRef } from "react";
import { User } from "../../../../../../redux/slice/userSlice";
import scss from "./Users.module.scss";
import Newuser from "./newuser/Newuser";

import deleteico from "@public/icons/detete.svg";
import Carduser from "./carduser/Carduser";
import { useAppDispatch, useAppSelector } from "@castomhooks/redux.hook";
import { useDrop } from "react-dnd";
import { useHttp } from "@castomhooks/http.hook";
import { deleteUser } from "redux/slice/workshopSlice";
import { selectorUser } from "redux/selectors";
import { setMessages } from "redux/slice/appSlice";
import Preloader from "@commons/preloader/Preloader";
interface IPropsUser {
  users: User[] | undefined;
}

export default function Users({ users }: IPropsUser) {
  return (
    <div className={scss.users}>
      <h4>Пользователи </h4>
      <AreaDelete />
      <div className={scss.listusers}>
        {users &&
          users
            .filter((i) => i.deleted === 0)
            .map((e, idx) => {
              return (
                <Carduser
                  nameUser={e.nameUser}
                  senameUser={e.senameUser}
                  access={e.access}
                  login={e.login}
                  id={e.id}
                  key={"user" + idx}
                />
              );
            })}
      </div>

      <Newuser />
    </div>
  );
}

function AreaDelete() {
  const dispatch = useAppDispatch();
  const ref = useRef(null);
  const [collectedProps, dropRef] = useDrop({
    accept: ["user"],
    drop: (item: { id: number }) => {
      deleteRow(item.id);
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  dropRef(ref);
  const { request, loading } = useHttp();
  const user = useAppSelector((state) => selectorUser(state));
  const deleteRow = async (idUser: number) => {
    try {
      if (idUser === user.id)
        throw new Error("Вы не можете удалить текущего пользователя");
      await request("/api/user/delete", "POST", { idUser });

      dispatch(deleteUser(idUser));
    } catch (error) {
      dispatch(setMessages(error.message));
    }
  };

  return (
    <div className={scss.areadelete} ref={ref}>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <img src={deleteico} alt="" />
          <div>
            Для удаления пользователя перенесите иконку пользователя в эту
            область
          </div>
        </>
      )}
    </div>
  );
}
