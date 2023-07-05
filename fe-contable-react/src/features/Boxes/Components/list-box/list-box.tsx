import { useMutation, useQuery } from "@apollo/client";
import { ListItems } from "../../../../shared/Components/list-item/list-item";
import { BoxServices } from "../../Services/boxServices";
import ItemBox from "../item-box/item-box";
import { MouseEventHandler, useEffect, useState } from "react";
import { Alert, Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { IiBox } from "../../models/box.interface";


export const ListBox = (props:IiBox) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { data, error, loading, refetch } = useQuery(
    BoxServices.BoxQueryServices.Boxs
  );
  const [MutateFuncion] = useMutation(
    BoxServices.BoxMutationServices.DeleteBox
    
  );
  
console.log (data)

  const handleItemDelete = async (item: any) => {
    await MutateFuncion({ variables: { id: item } });
    
  };
  
 

  return (
    
    <>
   
     {!loading && data && data.findUserBusiness ? (
      
      
    <div>
       
      <ListItems
        items={data.findUserBusiness[0].box}
        renderItem={(item:IiBox)=> <ItemBox {...item}/>}
        handleItemClick={function(item: any): void{
          console.log(item);
          handleItemDelete(item.id);
        
        }}
      ></ListItems>
    </div>
     ): (
      <div>
        spinner
      </div>
)}
    </>
    
  );
};


export default ListBox;