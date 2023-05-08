import React from "react";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IClient } from "../../models/client";
import ItemClient from "../ItemClient/itemClient";
import { useQuery } from "@apollo/client";
import { ClientServices } from "../../services/clientServices";

export const ListClient = () => {
  const { loading, error, data } = useQuery(
    ClientServices.QueryClientService.OBTENER_CLIENTES
  );

  console.log(data);
  const action = (item: IClient) => {
    console.log(item);
    return item;
  };

  return (
    <>
      {!loading && data.findClient ? (
        <div>
          <ListItems
            items={data.findClient ? data.findClient : []}
            renderItem={ItemClient}
            handleItemClick={(item: IClient) => {
              action(item);
            }}
          ></ListItems>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
