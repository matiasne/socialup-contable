import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface ISearchInput {
  onChange: (data: string) => void;
  placeholder: string;
}

export const SearchBar = (props: ISearchInput) => {
  const [to, setTo] = useState<any>(null);

  const handleChange = (event: any) => {
    clearTimeout(to);
    let t = setTimeout(() => {
      if (!event.target) return;
      console.log(event.target.value);
      props.onChange(event.target.value);
    }, 1500);
    setTo(t);
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={[]}
        sx={{ width: "80vw" }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={props.placeholder}
            onChange={handleChange}
          />
        )}
      />
    </div>
  );
};
