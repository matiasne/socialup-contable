import { Divider, Grid, List, ListItem } from "@mui/material";
import React from "react";

interface IProps {
  items: any[];
  renderItem: (item: any) => React.ReactNode;
  handleItemClick: (item: any) => void;
}

export const ListItemsGrid = ({
  items,
  renderItem,
  handleItemClick,
}: IProps) => {
  return (
    <div>
      <Grid container>
        {items.map((item: any, i) => {
          return (
            <>
              <Grid item key={item.id} onClick={() => handleItemClick(item)}>
                {renderItem(item)}{" "}
              </Grid>
              <Divider />
            </>
          );
        })}
      </Grid>
    </div>
  );
};
