"use client"

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {useState} from "react";
import {useSaleContext} from "@/context/SalesContext";

export default function AutoCompleteCustomers() {
  const {
    customers,
    setCustomers,
    isLoading,
    isError
  } = useSaleContext()
  const [open, setOpen] = useState(false);

  // @ts-ignore
  return (
    <Autocomplete
      id="autoCompleteCustomers"
      open={open}
      onOpen={() => {setOpen(true)}}
      onClose={() => {setOpen(false)}}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      options={customers}
      loading={isLoading}
      onChange={(event, value) => setCustomers(value)}
      renderInput={(params) => (
        <>
          <TextField
            {...params}
            required
            placeholder={"Selecione o nome"}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {!isLoading && isError ? <label>Error</label> : isLoading && !isError ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        </>
      )}
    />
  );
}