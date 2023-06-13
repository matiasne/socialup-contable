import { useEffect, useState } from "react";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IBusiness} from "../../models/business";
import { useMutation, useQuery } from "@apollo/client";
import { BusinessServices } from "../../services/businessServices";
import ItemBusiness from "../Item-business/item-business";

export const ListBusiness = (props: IBusiness) => {
  const { data, error, loading, refetch } = useQuery(
    BusinessServices.BusinessQueryServices.FindUserBusiness,({variables:{findUserBusinessId:"hola"}})
    );
   
    const [shouldRefetch, setShouldRefetch] = useState(false);

    const [MutateFuncion] = useMutation(
      BusinessServices.BusinessMutationServices.DeleteBusiness
    );

    useEffect(() => {
      if (shouldRefetch) {
        refetch();
        setShouldRefetch(false);
      }
    }, [shouldRefetch, refetch]);

    const handleItemDelete = async (item: any) => {
      await MutateFuncion({ variables: { id: item } });
    };

  return (
    <>
      {!loading &&data &&data.findUserBusiness?(
        <div>
          <ListItems
            items={data.findUserBusiness}
            renderItem={(item: IBusiness) => <ItemBusiness {...item} />}        //{(ItemBusiness)}
            handleItemClick={function (item: any): void {
              handleItemDelete(item.id);
            }}
          ></ListItems>
        </div>) : (<div>spinner</div>)}
  </>
  );
};
export default ListBusiness;

