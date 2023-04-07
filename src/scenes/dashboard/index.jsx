import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useGetTransactionsQuery } from "state/api";
import StatBox from "components/StatBox";
import Chart from "components/Chart";
import { useEffect, useMemo, useState } from "react";
import axios from "../axios";
const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetTransactionsQuery();
const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
const [userStats, setUserStats] = useState([]);
    const [pStats, setPStats] = useState([]);
    

  const MONTHS = useMemo(
    () => [
      "Янв",
      "Фев",
      "Мар",
      "Апр",
      "Май",
      "Июн",
      "Июл",
      "Авг",
      "Сен",
      "Окт",
      "Ноя",
      "Дек",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Активных пользователей": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);
  
useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/orders/income" );
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Сумма продаж": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);
  
  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await axios.get("orders/income");
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch {}
    };
    getIncome();
  }, []);
  
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
      <FlexBetween>
        <Header title="ПАНЕЛЬ УПРАВЛЕНИЯ" subtitle="Добро пожаловать" />

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
            <DownloadOutlined sx={{ mr: "10px" }} />
            Скачать отчёты
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Прибыль"
          value={income[1]?.total}
       
          description={`месяц ${income[1]?._id}`}
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Продаж сегодня"
          value="7700"
          increase="+21%"
          description=""
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
      <Chart
        data={pStats}
        title="Аналитика продаж"
        grid
        dataKey="Сумма продаж"
      />
        </Box>


        <StatBox
          title="За год"
          value="1940000"
          increase="+43%"
          
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Новых пользователей"
          value="328"
          
          
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
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
              backgroundColor: theme.palette.background.alt,
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
    </Box>
  );
};

export default Dashboard;
