import React, { useState } from "react";
import scss from "./ViewListMaterials.module.scss";
import { MaterialType } from "../../../redux/slice/materialSlice";
import MaterialItem from "../materialitem/MaterialItem";
import Toggle from "@commons/toggle/Toggle";
interface IPropsViewListMaterials {
  materials: MaterialType[];
  notDrag?: boolean;
  part?: string;
  deleted?: boolean;
  notoptions?: boolean;
}
export default function ViewListMaterials({
  materials,
  notDrag = false,
  part,
  deleted = false,
  notoptions = false,
}: IPropsViewListMaterials) {
  const [isNotNull, setisNotNull] = useState(false);

  let resultMaterial = materials;
  if (!deleted) resultMaterial = resultMaterial.filter((i) => i.deleted !== 1);
  if (!!isNotNull) resultMaterial = resultMaterial.filter((i) => i.stock > 0);

  return (
    <>
      {!notoptions && (
        <div className={scss.boxtoggle}>
          <Toggle
            title="Только в наличии"
            name="isNotNull"
            toggle={[isNotNull, setisNotNull]}
          />
        </div>
      )}

      <div className={scss.listmaterials}>
        {resultMaterial.map((e) => {
          return (
            <div key={e.id}>
              <MaterialItem
                deleted={e.deleted}
                color={e.color}
                thickness={e.thickness}
                coverage={e.coverage}
                name={e.name}
                stock={e.stock}
                id={e.id}
                enteringBalance={e.enteringBalance || undefined}
                writeDown={e.writeDown || undefined}
                entrance={e.entrance || undefined}
                price={e.price || undefined}
                notDrag={notDrag}
                part={part || undefined}
                quantity={e.quantity || undefined}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
