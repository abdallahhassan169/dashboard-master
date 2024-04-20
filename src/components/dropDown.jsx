import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DropDown({
  data,
  onChange,
  helperText,
  label,
  register,
  fieldName,
}) {
  return (
    <div>
      <FormControl
        sx={{ m: 1, minWidth: 120, position: "relative", width: "100%" }}
      >
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label={label}
          onChange={onChange}
          {...register(fieldName, { required: "This Field Is Required!" })}
        >
          <MenuItem value="">
            <em>Select</em>
          </MenuItem>
          {data?.map((item) => (
            <MenuItem value={item?.id}>{item?.name}</MenuItem>
          ))}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  );
}
