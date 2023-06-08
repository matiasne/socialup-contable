import React from "react";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { IBusiness, IiBusiness } from "../../models/business";
import { useQuery } from "@apollo/client";
import { BusinessServices } from "../../services/businessServices";
import ItemBusiness from "../Item-business/item-business";

export const ListBusiness = (props: IBusiness) => {
  const { data, error, loading, refetch } = useQuery(
    BusinessServices.BusinessQueryServices.FindBusiness,{
      variables:{id:'63e693ce447082f41bcc0c5f'}
    }
    ) 

  const action = (item: IBusiness) => {
    console.log(item);
  };

  return (
    <>
    {!loading &&data &&data.findOneBusiness?(
      <div>
 <ListItems
 items={data.findOneBusiness}
 renderItem={ItemBusiness}
 handleItemClick={(item: IBusiness) => {
   action(item);
 }}
></ListItems>
</div>) 
    :console.log("ningunalista")
    }
    
     
  </>
  );
};

