"use client"

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {useEffect, useState} from 'react';
import {useSaleContext} from "@/context/SalesContext";
import { Seller } from '@/interfaces/interfaces';



export default function AutoCompleteSellers(sellerName?: string) {
  const [sellerEdit, setSellerEdit] = useState<Seller | null>(null)
  const {
    sellers,
    setSellers,
    isLoading,
    isError
  } = useSaleContext()
  const [open, setOpen] = useState(false);

  const getSeller = (sellerName: string | null) => {
    const sellerEdit = sellers.find((seller) => seller.name === sellerName)
    return sellerEdit !== undefined ? sellerEdit : null
  }

  useEffect(() => {
    setSellerEdit(getSeller(sellerName !== undefined ? sellerName : null))
  }, []);

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
      value={sellerName !== null ? sellerEdit : null}
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