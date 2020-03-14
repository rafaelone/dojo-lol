import React, { memo } from "react"
import api from "../services/api"

function Item(nome) {
  return (
    <li>
      <img src={`${api}/img/champion/${nome}.png`} />
      <p>{nome}</p>
    </li>
  );
}

export default memo(Item);
