import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const ComboBox = (props) => {
  return (
    <Autocomplete
      multiple={props?.multiple}
      limitTags={2}
      id="multiple-limit-tags"
      freeSolo
      disableClearable
      clearOnBlur
      //   inputValue={props.value}
      options={props?.values ? props?.values : []}
      getOptionLabel={(option) => option?.label}
      //   defaultValue={[props.value]}
      value={props?.value}
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
        props?.autoCompleteCallback && props?.autoCompleteCallback();
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          placeholder={props.placeholder}
        />
      )}
      //   sx={{ width: "500px" }}
    />
  );
};

export default ComboBox;
