"use client"

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {Seller} from "@/interfaces/interfaces";
import useQuerySeller from "@/hooks/seller/hook";
import {useEffect, useState} from 'react';

export default function AutoCompleteSellers() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Seller[]>([])
  const [seller, setSeller] = useState<Seller | null>(null)
  const { data, isLoading, isError } = useQuerySeller()

  useEffect(() => {
      !isLoading && !isError ? setOptions(data != null ? data : []) : null
      // !isLoading && !isError && params ? options.find(seller => seller.id === params.sellerNumber) : null
    }, [data, isError, isLoading, open]);

  return (
    <Autocomplete
      id="asyncSellers"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={isLoading}
      onChange={(event, value) => {
          // let editSeller = !isLoading && !isError ? options.find((option) => option.id === params.sellerNumber) : value
          setSeller(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          // label="Lista de vendedores"
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