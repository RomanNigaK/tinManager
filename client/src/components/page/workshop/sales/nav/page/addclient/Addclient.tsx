import React from "react";
import scss from "./Addclient.module.scss";
import { NewClient } from "../client/Client";
import Align from "@commons/align/Align";

export default function Addclient() {
  return (
    <div>
      <Align side="right">
        <h4>Новый клиент</h4>
      </Align>

      <NewClient />
    </div>
  );
}
