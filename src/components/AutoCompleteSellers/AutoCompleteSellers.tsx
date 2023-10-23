"use client"

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {useState} from 'react';
import {useSaleContext} from "@/context/SalesContext";

export default function AutoCompleteSellers() {
  const {
    sellers,
    setSellers,
    isLoading,
    isError,
    seller
  } = useSaleContext()
  const [open, setOpen] = useState(false);

  return (
    <Autocomplete
      id="asyncSellers"
      open={open}
      onOpen={() => {setOpen(true)}}
      onClose={() => {setOpen(false)}}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      options={sellers}
      loading={isLoading}
      value={seller}
      onChange={(event, value) => { // @ts-ignore
        setSellers(value)}}
      renderInput={(params) => (
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
      )}
    />
  );
}