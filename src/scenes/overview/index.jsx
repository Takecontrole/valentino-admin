import React from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import Header from "components/Header";
import Chart from "components/Chart";

import { useEffect, useMemo, useState } from "react";
import axios from "../axios";
const Overview = () => {
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

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Продажи"
        subtitle="Обзор выручки"
      />
      <Box height="75vh">
<Chart
        data={userStats}
        title="Пользовательская аналитика"
        grid
        dataKey="Активных пользователей"
      />
      <Chart
        data={pStats}
        title="Аналитика продаж"
        grid
        dataKey="Сумма продаж"
      />
      </Box>
    </Box>
  );
};

export default Overview;
