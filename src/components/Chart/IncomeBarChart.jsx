/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { useRevenueRatioByYearQuery } from "../../Redux/api/earningApi";

const IncomeBarChart = ({ selectedYear }) => {
  const { data: revenueData, refetch } =
    useRevenueRatioByYearQuery(selectedYear);
  const [chartData, setChartData] = useState([]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (revenueData && revenueData.data) {
      const transformedData = revenueData.data.map((item) => ({
        month: monthNames[item.month - 1],
        income: item.totalIncome,
      }));
      setChartData(transformedData);
    }
  }, [revenueData]);

  useEffect(() => {
    refetch();
  }, [selectedYear, refetch]);

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar
            name="Income"
            dataKey="income"
            fill="#222021"
            barSize={20}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeBarChart;
