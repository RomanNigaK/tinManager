import React, { useEffect, useState } from "react";
import scss from "./Commons.module.scss";
import Toggle from "@commons/toggle/Toggle";
import {
  ISettingCommons,
  apdateSetting,
  setSetting,
} from "redux/slice/workshopSlice";
import { useAppDispatch } from "@castomhooks/redux.hook";

interface ICommons {
  commons: ISettingCommons;
}

export default function Commons({ commons }: ICommons) {
  const [isSellInTheNegative, setSellInTheNegative] = useState(
    commons.sellInTheNegative
  );
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    const newCommons = {
      ...commons,
      sellInTheNegative: !!!isSellInTheNegative,
    };
    console.log(newCommons);

    dispatch(apdateSetting({ part: "commons", setting: newCommons }));
  };

  return (
    <div className={scss.commons}>
      <h4>Общие настройки</h4>
      <div className={scss.blockoptions}>
        <div>
          <Toggle
            title="Списывать в минус при недостаточном количестве материала"
            name="isSellInTheNegative"
            toggle={[isSellInTheNegative, setSellInTheNegative]}
            click={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
