import { useMutation, useQuery } from "@apollo/client";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IClient } from "../../models/client";
import { ClientServices } from "../../services/clientServices";
import ItemClient from "../item-client/itemClient";

export const ListClient = (props: IClient) => {
  const { data, error, loading, refetch } = useQuery(
    ClientServices.QueryClientService.clients
  );

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
