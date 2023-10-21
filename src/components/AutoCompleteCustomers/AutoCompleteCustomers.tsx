"use client"

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import {Client} from "@/interfaces/interfaces";
import useQueryClient from "@/hooks/client/hook";
import {useEffect, useState} from "react";
import Divider from '@mui/material/Divider/Divider';

export default function AutoCompleteCustomers() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Client[]>([])
  const [client, setClient] = useState<Client | null>(null)
  const { data, isLoading, isError } = useQueryClient()

  useEffect(() => {
      !isLoading && !isError ? setOptions(data != null ? data : []) : null
    }, [data, isError, isLoading, open]);

  return (
    <Autocomplete
      id="asyncCustomers"
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
      onChange={(event, value) => setClient(value)}
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
              <Divider orientation={"horizontal"} />
          </>

      )}
    />
  );
}