import { Divider, List, ListItem } from "@mui/material";
import React from "react";

interface IProps {
  items: any[];
  renderItem: (item: any) => React.ReactNode;
  handleItemClick: (item: any) => void;
}

export const ListItems = ({ items, renderItem, handleItemClick }: IProps) => {
  console.log(items);
  return (
    <div>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          textAlign: "center",
          margin: "auto",
        }}
      >
        {items.map((item: any, i) => {
          return (
            <>
              <ListItem key={i} onClick={() => handleItemClick(item)}>
                {renderItem(item)}{" "}
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>
    </div>
  );
};
