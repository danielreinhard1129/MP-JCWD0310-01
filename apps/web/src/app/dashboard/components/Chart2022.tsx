"use client";

import useGetEventsByOrganizer from "@/hooks/api/admin/useGetEventsByOrganizer";
import useGetTransactionsByOrganizer from "@/hooks/api/transactions/useGetTransactionsByOrganizer";
import { useAppSelector } from "@/redux/hooks";
import { IStatusTransaction } from "@/types/transaction.type";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

const Chart2022 = () => {
  const { id } = useAppSelector((state) => state.user);
  const { data: event } = useGetEventsByOrganizer({ id, take: 100, page: 1 });
  const { data: transaction } = useGetTransactionsByOrganizer({
    id,
    take: 100,
    page: 1,
    status:IStatusTransaction.COMPLETE
  });

  const targetYear = 2024;

  // Initialize counts per month
  const eventsCountPerMonth = Array(12).fill(0);
  const transactionsCountPerMonth = Array(12).fill(0);
  const bookedCountPerMonth = Array(12).fill(0);
  const transactionSumsPerMonth = Array(12).fill(0);

  if (event) {
    Object.keys(event).forEach((key) => {
      const date = new Date(event[Number(key)].startDate);
      if (date.getFullYear() === targetYear) {
        const month = date.getMonth();
        eventsCountPerMonth[month]++;
        bookedCountPerMonth[month] += event[Number(key)].booked || 0;
      }
    });
  }

  if (transaction) {
    Object.keys(transaction).forEach((key) => {
      const date = new Date(transaction[Number(key)].createdAt);
      if (date.getFullYear() === targetYear) {
        const month = date.getMonth();
        transactionsCountPerMonth[month]++;
        transactionSumsPerMonth[month] += transaction[Number(key)].total || 0;
      }
    });
  }
  console.log("asdasdasdasdasd", transactionsCountPerMonth);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Statistic per Month",
      },
    },
  };

  const labels = [
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

  const data = {
    labels,
    datasets: [
      {
        label: "Event",
        data: eventsCountPerMonth,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Transaction",
        data: transactionsCountPerMonth,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Attendees",
        data: bookedCountPerMonth,
        borderColor: "#14C11A",
        backgroundColor: "#0D9111",
      },
      {
        label: "Transaction Sums",
        data: transactionSumsPerMonth,
        borderColor: "#FF9800",
        backgroundColor: "rgba(255, 152, 0, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default Chart2022;
