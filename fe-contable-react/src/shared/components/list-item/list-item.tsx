import { List, ListItem } from "@mui/material";
import React from "react";

interface IProps {
  items: any[];
  renderItem: (item: any) => React.ReactNode;
}

export const ListItems = ({ items, renderItem }: IProps) => {
  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {items.map((item: any, i: any) => {
          return <ListItem key={i}>{renderItem(item)}</ListItem>;
        })}
      </List>
    </div>
  );
};
