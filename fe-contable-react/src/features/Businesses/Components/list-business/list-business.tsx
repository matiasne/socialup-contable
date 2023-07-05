import { useEffect, useState } from "react";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IBusiness} from "../../models/business";
import { useMutation, useQuery } from "@apollo/client";
import { BusinessServices } from "../../services/businessServices";
import ItemBusiness from "../Item-business/item-business";
import { setSessionService } from "../../../../auth/services/session.service";

export const ListBusiness = (props: IBusiness) => {
  const { data, error, loading, refetch } = useQuery(
    BusinessServices.BusinessQueryServices.FindUserBusiness,{
      variables:{
        pageCount: 1,
        perPage: 10,
        searchWord: ""
      }
    }
    );
  console.log(data)
  //  const [shouldRefetch, setShouldRefetch] = useState(false);

   // const [MutateFuncion] = useMutation(
  //    BusinessServices.BusinessMutationServices.DeleteBusiness
   // );

    useEffect(() => {
    //  if (shouldRefetch) {
        refetch();
    //    setShouldRefetch(false);
    //  }
    }, []);
/*
const handleItemDelete = async (item: any) => {
      await MutateFuncion({ variables: { id: item } });
    };
*/
const handleSelectBusiness = (item: any) => {
      setSessionService("business", item._id)
    };

  return (
    <>
      {!loading &&data &&data.findUserBusiness?(
        <div>
          <ListItems
            items={data.findUserBusiness}
            renderItem={(item: IBusiness) => <ItemBusiness {...item} />}
            handleItemClick={handleSelectBusiness}
          ></ListItems>
        </div>) : (<div>spinner</div>)}
  </>
  );
};
export default ListBusiness;

