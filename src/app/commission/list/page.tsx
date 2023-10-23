"use client"

import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Commission, currency} from "@/interfaces/interfaces";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import queryListCommissions from "@/hooks/commission/hook";
import {useSaleContext} from "@/context/SalesContext";


export default function TableData() {

    const { setMenu } = useSaleContext()
    const [listCommissions, setListCommissions] = useState<Commission[]>([])
    const dateStartToString = new Date().toLocaleDateString('pt-br')
    const dateEndPlus = new Date()
    dateEndPlus.setDate(dateEndPlus.getDate() + 1);
    const dateEndToString = dateEndPlus.toLocaleDateString('pt-br')


    const [dateEnd, setDateEnd] = useState<Dayjs | null>(null);
    const [dateStart, setDateStart] = useState<Dayjs | null>(null);
    const { data, isLoading, isError, refetch } = queryListCommissions(dateStart, dateEnd)

    useEffect(() => {
        // @ts-ignore
      !isLoading && !isError ? setListCommissions(data) : null
      setMenu("Comissões")
    }, [data, isLoading, isError, listCommissions]);


  return (
    <>
      <Grid container padding={3} direction={"column"} spacing={3}>
        <Grid item>
          <Grid container sx={{marginTop: "2.5rem" }}>
            <Grid item xs={7}>
              <Typography variant={"h5"} fontWeight={"bold"} color={"primary"}>
                Reltório de Comissões
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                  value={dateStart}
                  onChange={(dateStartNew) => setDateStart(dayjs(dateStartNew))}
                />
                <DatePicker
                  value={dateEnd}
                  onChange={(dateEndNew) => setDateEnd(dayjs(dateEndNew))}
                />
                <Button onClick={() => refetch()} color={"primary"} variant={"contained"}>
                  <SearchIcon />
                </Button>
              </DemoContainer>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {!isLoading && !isError ?
            <TableContainer style={{ maxHeight: "10rem" }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <Typography variant={"body1"} fontWeight={"bold"}>
                        Cód.
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant={"body1"} fontWeight={"bold"}>
                        Vendedor
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant={"body1"} fontWeight={"bold"}>
                        Total de Vendas
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant={"body1"} fontWeight={"bold"}>
                        Total de Comissão
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!isLoading && !isError && listCommissions.length > 0 ?
                    listCommissions.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row" align="center">
                          {row.id}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.totalSales}</TableCell>
                        <TableCell align="center">{Number(row.totalCommission).toLocaleString('pt-BR', currency)}</TableCell>
                      </TableRow>
                    ))
                    :
                    <TableRow key={0}>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center">
                        <Typography variant={"caption"}>
                          Nenhum informação encontrada, tente outro intervalo de datas.
                        </Typography>
                      </TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  }
                </TableBody>
              </Table>
            </TableContainer>
            :
            <Grid container justifyContent={"center"}>
              <Grid item>
                <Typography variant={"caption"}>
                  Para visualizar, selecione um período nos campos acima
                </Typography>
              </Grid>
            </Grid>
          }
        </Grid>
      </Grid>
    </>
  );
}
