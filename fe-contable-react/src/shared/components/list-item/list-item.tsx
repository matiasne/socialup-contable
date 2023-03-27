import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import React from "react";

export interface IProps {
  //deberia venir <ListItem></ListItem>
  data: any[];
}

export const ListItems = (item: IProps) => {
  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {item.data.map((data, i) => {
          return <ListItem key={i}>{data.item}</ListItem>;
        })}
      </List>
    </div>
  );
};
