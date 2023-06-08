import { useMutation, useQuery } from "@apollo/client";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IClient } from "../../models/client";
import { ClientServices } from "../../services/clientServices";
import { useEffect, useState } from "react";
import ItemClient from "../item-client/itemClient";

export const ListClient = (props: IClient) => {
  const { data, error, loading, refetch } = useQuery(
    ClientServices.QueryClientService.clients
  );
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const [deleteClient] = useMutation(
    ClientServices.ClientMutationServices.DeleteClient,
    {
      refetchQueries: [ClientServices.QueryClientService.clients],
    }
  );

  const handleItemDelete = async (item: any) => {
    await deleteClient({ variables: { id: item } });
  };

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      setShouldRefetch(false);
    }
  }, [shouldRefetch, refetch]);

  return (
    <>
      {!loading && data && data.findClient ? (
        <div>
          <ListItems
            items={data.findClient}
            renderItem={(item: IClient) => <ItemClient {...item} />}
            handleItemClick={function (item: any): void {
              console.log(item);
              handleItemDelete(item.id);
            }}
          ></ListItems>
        </div>
      ) : (
        <div>spinner</div>
      )}
    </>
  );
};

export default ListClient;
