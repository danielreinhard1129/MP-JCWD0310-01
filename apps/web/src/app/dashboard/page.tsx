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

const Dashboard = () => {
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
        text: "Chart.js Line Chart",
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
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 }),
        ),
        borderColor: "#19bdb2",
        backgroundColor: "#05f2e2",
      },
      {
        label: "Dataset 2",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 }),
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
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
