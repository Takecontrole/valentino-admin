import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Transactions = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetTransactionsQuery();
  console.log("data", data);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "count",
      headerName: "Кол-во",
      flex: 0.2,
    },
    {
      field: "total",
      headerName: "Сумма",
      flex: 0.4,
    },
    {
      field: "address",
      headerName: "Адрес",
      flex: 0.5,
    },
    {
      field: "country",
      headerName: "Город",
      flex: 0.5,
    },
    {
      field: "date",
      headerName: "Дата",
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Статус",
      flex: 0.5,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Заказы" subtitle="Список транзакций" />
              <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
           <a style={{textDecoration:"none", color: theme.palette.background.alt}} href="https://takecontrole.github.io/valentino/#/view-orders" target="_blank">
            Управление доставкой
         </a> 
          </Button>
        </Box>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
