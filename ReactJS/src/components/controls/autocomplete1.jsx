import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import { Checkbox } from "@mui/material";
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ComboBox1 = (props) => {
  return (
    <Autocomplete
      multiple={props?.multiple}
      limitTags={2}
      id="multiple-limit-tags"
      //   inputValue={props.value}
      options={props?.values}
      getOptionLabel={(option) => option?.label}
      //   defaultValue={[props.value]}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          props.setValue({
            label: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          props.setValue({
            label: newValue.inputValue,
          });
        } else {
          props.setValue(newValue);
        }
      }}
      renderOption={(props) => (
        <li {...props}>
          <TextField label="Quantity" placeholder="Quantity" />
        </li>
      )}
      renderInput={(params) => (
        <>
          {/* <TextField {...params} label="Quantity" placeholder="Quantity" /> */}
          <TextField
            {...params}
            // label={props.label}
            label="Checkboxes"
            placeholder={props.placeholder}
          />
        </>
      )}
      style={{ width: 500 }}
    />
  );
};

export default ComboBox1;
