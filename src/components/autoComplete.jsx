import * as React from "react";
import { Autocomplete, TextField, FormControl } from "@mui/material";
import { postApi } from "../utilis/postApi";

export default function AutoCompleteComponent({
  register,

  url,
  name,
  nameAttr,
  idAttr,
  label,
  sx,
}) {
  const [suggestions, setSuggestions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [value, setValue] = React.useState("");
  // Fetching suggestions
  const fetchSuggestions = async (query) => {
    if (query.length >= 2) {
      const res = await postApi(url, { query: query, limit: 5 });
      setSuggestions(res || []);
    }
  };

  // Effect to manage loading of suggestions
  React.useEffect(() => {
    fetchSuggestions(inputValue);
  }, [inputValue]);

  return (
    <div>
      <FormControl
        sx={{ m: 1, minWidth: 150, position: "relative", width: "100%", ...sx }}
      >
        <Autocomplete
          disablePortal
          id={name}
          options={suggestions}
          getOptionLabel={(option) => option[nameAttr]}
          isOptionEqualToValue={(option, value) =>
            option[idAttr] === value[idAttr]
          }
          onChange={() => console.log("first")}
          {...register(name, { required: "This field is required!" })}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      </FormControl>
    </div>
  );
}
