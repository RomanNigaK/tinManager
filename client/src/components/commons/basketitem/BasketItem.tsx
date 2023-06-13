import React, { useRef } from "react";
import scss from "./BasketItem.module.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import { useDrop } from "react-dnd";
import { useHttp } from "../../../hooks/http.hook";
import { setMaterials } from "../../../redux/slice/materialSlice";
import { selectorUser } from "../../../redux/selectors";
import DeleteSvg from "../svg/DeleteSvg";
export default function BasketItem() {
  const dispatch = useAppDispatch();
  const ref = useRef(null);
  const [collectedProps, dropRef] = useDrop({
    accept: ["item"],
    drop: (item: { id: number }) => {
      deleteRow(item);
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  dropRef(ref);
  const { request } = useHttp();

  const deleteRow = async (body: any) => {
    try {
      body.workshop = user!.workshop;
      body.userId = user!.id;
      await request("/api/material/deleteid", "POST", body);

      const data = await request("/api/material/list", "POST", {
        id: user!.workshop,
      });
      dispatch(setMaterials(data));
    } catch (error) {
      console.log(error);
    }
  };

  const user = useAppSelector((state) => selectorUser(state));

  return (
    <div className={scss.basket} ref={ref}>
      <div className={scss.data}>
        <DeleteSvg width="60px" height="60px" stroke="1" color="#C99432" />

        <div className={scss.text}>
          Перетяните в эту область элемент для удаления
        </div>
      </div>
    </div>
  );
}
