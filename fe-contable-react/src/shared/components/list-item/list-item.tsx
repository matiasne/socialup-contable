import { List, ListItem } from "@mui/material";
import React from "react";

interface IProps {
  items: any[];
  renderItem: (item: any) => React.ReactNode;
}

export const ListItems = ({ items, renderItem }: IProps) => {
  console.log(items);
  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {items.map((item: any) => {
          return item.map((data: any, i: any) => {
            return <ListItem key={i}>{renderItem(data)}</ListItem>;
          });
        })}
      </List>
    </div>
  );
};
