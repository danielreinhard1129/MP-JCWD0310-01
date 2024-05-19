"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import faker from 'faker';

import { faker } from "@faker-js/faker";

import AuthGuardOrganizer from "@/hoc/AuthGuardOrganizer";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  Calendar,
  Contact,
  Home as HomeIcon,
  TicketCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useGetTransactionsByOrganizer from "@/hooks/api/transactions/useGetTransactionsByOrganizer";
import { useAppSelector } from "@/redux/hooks";
import { IStatusTransaction, TRX } from "@/types/transaction.type";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
// } from "recharts";

interface SortedArray {
  date: string;
  total: number;
  count: number
}

interface DataProps {
  name: string;
  data: {
    title: string;
    name: string;
    value: number;
  }[];
}

const Dashboard = () => {
  const { id } = useAppSelector((state) => state.user);
  const { data: transactions } = useGetTransactionsByOrganizer({
    id,
    sortBy: "createdAt",
    sortOrder: "asc",
    status: IStatusTransaction.COMPLETE,
  });

  console.log(transactions);

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
        text: "Daily Revenue",
      },
    },
    scales: {
      x: {
        // type: 'line',
        time: {
          unit: "day",
          tooltipFormat: "PP",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          // text: "Total Amount",
        },
      },
    },
  };
  const aggregateTransactionsByDay = (transactions: TRX[]) => {
    const dailyTotals = transactions.reduce((acc: any, transaction) => {
      const date = new Date(transaction.createdAt).toISOString().split("T")[0];
      if (!acc[date]) {
        acc[date] = { date: date, total: 0 , count: 0};
      }
      acc[date].total += transaction.total;
      acc[date].count += 1;
      return acc;
    }, {});

    return Object.values(dailyTotals);
  };
  const result: any = aggregateTransactionsByDay(transactions);

  const sortedArray: SortedArray[] = result.sort(
    (a: SortedArray, b: SortedArray) =>
      Number(new Date(a.date)) - Number(new Date(b.date)),
  );

  console.log(" ini totalSortedArray", sortedArray);

  const labels = sortedArray.map((transaction) =>
    new Date(transaction.date).getDate(),
  );
  const newDate = new Date().getDate();

  const arr = [];

  for (let i = 1; i < 8; i++) {
    arr.push(newDate - 7 + i);
  }

  // console.log(arr);

  const totals = sortedArray.map((transaction) => transaction.total);
  const counts = sortedArray.map((transaction) => transaction.count);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Amount",
        data: totals,
        fill: false,
        backgroundColor: "#b31b10",
        borderColor: "#eb4034",
        borderWidth: 1,
        tension: 0.1,
      },
      {
        label: "Total Transactions",
        data: counts,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "#1051b3",
        borderWidth: 1,
        tension: 0.1,
      },
    ],
  };
  const router = useRouter();
  return (
    <main className=" min-w-full md:m-0">
      {/* =============== DESKTOP ============== */}
      <section className="">
        <div className="my-0 flex gap-4 rounded-lg bg-transparent bg-zinc-100 shadow-inner">
          <div className="sticky top-0 h-screen w-[250px] bg-marine-400 shadow-sm">
            <div className="flex h-full flex-col items-center gap-2 py-20">
              <Button
                variant="ghost"
                onClick={() => router.push("/dashboard")}
                className="h-16 w-full justify-start rounded-none pl-8 text-violet-100 hover:bg-zinc-200 hover:shadow-inner"
              >
                <HomeIcon className="mr-2 h-6 w-6" />
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push("/dashboard/transactions")}
                className="h-16 w-full justify-start rounded-none pl-8 text-violet-100 hover:bg-zinc-200 hover:shadow-inner"
              >
                <TicketCheck className="mr-2 h-6 w-6" />
                Transactions
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push("/dashboard/event-list")}
                className="h-16 w-full justify-start rounded-none pl-8 text-violet-100 hover:bg-zinc-200 hover:shadow-inner"
              >
                <Calendar className="mr-2 h-6 w-6" />
                Events
              </Button>
            </div>
          </div>
          <div className="h-[1200px] w-5/6">
            <div className="mt-8 h-full bg-transparent px-4">
              <div className="mb-4 flex justify-between px-2">
                <h1 className="text-4xl font-bold">Organizer Dashboard</h1>
              </div>
              <div className="mt-2 p-2">
                <Line
                  options={options}
                  data={data}
                  className="rounded-2xl bg-white p-2 shadow-md"
                />
                {/* <ResponsiveContainer>
                  <LineChart
                    width={600}
                    height={300}
                    data={sortedArray}
                    margin={{ top: 5, right: 20, bottom: 5, left: 10 }}
                  >
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" />
                    <YAxis dataKey="" />
                    <Tooltip/>
                    <Legend/>
                  </LineChart>
                </ResponsiveContainer> */}
              </div>
              <Separator className="my-8 h-0.5 bg-white" />
            </div>
          </div>
        </div>
      </section>
      {/* ============ END DESKTOP ============= */}
    </main>
  );
};

export default AuthGuardOrganizer(Dashboard);
