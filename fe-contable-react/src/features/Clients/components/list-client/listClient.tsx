import { useMutation, useQuery } from "@apollo/client";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IClient } from "../../models/client";
import { ClientServices } from "../../services/clientServices";
import ItemClient from "../item-client/itemClient";
import { useState } from "react";
import FloatingAddForm from "../../../../shared/Components/floating-add/floating-add";

export const ListClient = (props: IClient) => {
  const { data, error, loading, refetch } = useQuery(
    ClientServices.QueryClientService.clients
  );
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    refetch();
    setModalOpen(false);
  };

  return (
    <>
      {!loading && data && data.findUserBusiness ? (
        <ListItems
          items={data.findUserBusiness[0].client}
          renderItem={(item: IClient) => <ItemClient client={item} />}
          handleItemClick={function (item: IClient): void {
            console.log(item);
            //handleItemDelete(item.id);
          }}
        ></ListItems>
      ) : (
        <div>spinner</div>
      )}
    </>
  );
};

export default ListClient;
