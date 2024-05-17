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
import { BarChart3, Calendar, Contact, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  return (
    <main className="md:container md:mx-auto">
      {/* =============== DESKTOP ============== */}
      <section className="hidden md:block">
        <div className="my-8 grid grid-cols-5 gap-4 rounded-lg bg-transparent bg-zinc-100 p-4 shadow-inner">
          <div className="sticky top-0 col-span-1 h-screen min-w-full rounded-lg bg-blue-800 shadow-xl">
            <div className="flex h-full flex-col items-center justify-between gap-8 py-24 ">
              <Button
                variant="ghost"
                className="h-24 w-full justify-center rounded-none text-violet-100 hover:bg-white"
              >
                <HomeIcon className="mr-2 h-6 w-6" />
                Home
              </Button>
              <Button
                variant="ghost"
                className="h-24 w-full justify-center rounded-none text-violet-100 hover:bg-white"
              >
                <BarChart3 className="mr-2 h-6 w-6" />
                Analytics
              </Button>
              <Button
                variant="ghost"
                className="h-24 w-full justify-center rounded-none text-violet-100 hover:bg-white"
              >
                <Calendar className="mr-2 h-6 w-6" />
                Events
              </Button>
              <Button
                variant="ghost"
                className="h-24 w-full justify-center rounded-none text-violet-100 hover:bg-white"
              >
                <Contact className="mr-2 h-6 w-6" />
                Profile
              </Button>
            </div>
          </div>
          <div className="col-span-4 h-[1200px]">
            <div className="h-full rounded-lg bg-marine-100 px-4 shadow-xl">
              <div className="p-8 ">
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

      {/* ===================== MOBILE ================== */}
      <section className="block md:hidden">
        <div className="mx-1 my-1 grid grid-cols-7 rounded-lg bg-transparent bg-zinc-100  shadow-inner">
          <div className="sticky top-0 col-span-1 h-screen min-w-full rounded-lg bg-blue-800 shadow-xl">
            <div className="flex h-full flex-col items-center justify-between gap-4 py-48">
              <Button
                variant="ghost"
                className="h-24 w-full justify-center rounded-none text-violet-100 hover:bg-white"
              >
                <HomeIcon className="mr-2 h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                className="h-24 w-full justify-center rounded-none text-violet-100 hover:bg-white"
              >
                <BarChart3 className="mr-2 h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                className="h-24 w-full justify-center rounded-none text-violet-100 hover:bg-white"
              >
                <Calendar className="mr-2 h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                className="h-24 w-full justify-center rounded-none text-violet-100 hover:bg-white"
              >
                <Contact className="mr-2 h-6 w-6" />
              </Button>
            </div>
          </div>
          <div className="col-span-6 h-[1200px]">
            <div className="h-full rounded-lg bg-marine-100 px-4 shadow-xl">
              <div className="min-h-full object-fill py-8  ">
                <Line
                  options={options}
                  data={data}
                  className="min-h-96 rounded-2xl bg-white p-1 shadow-md"
                />
                <div className="my-8 h-0.5 bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ============= END MOBILE ===================== */}
    </main>
  );
};

export default AuthGuardOrganizer(Dashboard);
