import { useMutation, useQuery } from "@apollo/client";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IClient } from "../../models/client";
import { ClientServices } from "../../services/clientServices";
import ItemClient from "../item-client/itemClient";

export const ListClient = () => {
  const { data, error, loading, refetch } = useQuery(
    ClientServices.QueryClientService.clients
  );

  const clients = data?.findUserBusiness[0]?.client.slice(0, 10);

  return (
    <>
      {!loading && data && data.findUserBusiness ? (
        <ListItems
          items={clients}
          renderItem={(item: IClient) => <ItemClient client={item} />}
          handleItemClick={function (item: IClient): IClient {
            console.log(item);
            return item;
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
