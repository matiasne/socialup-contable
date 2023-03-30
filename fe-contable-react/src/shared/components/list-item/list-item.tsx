import { Divider, List, ListItem } from "@mui/material";
import React from "react";

interface IProps {
  items: any[];
  renderItem: (item: any) => React.ReactNode;
}

export const ListItems = ({ items, renderItem }: IProps) => {
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
              <ListItem key={i}>{renderItem(item)}</ListItem>
              <Divider />
            </>
          );
        })}
      </List>
    </div>
  );
};
