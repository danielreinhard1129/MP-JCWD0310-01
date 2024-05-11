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
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
    <main className="container mx-auto">
      <section className="my-8 grid grid-cols-5 gap-4 p-4 bg-zinc-100 bg-transparent rounded-lg shadow-inner">
        <div className="sticky top-0 col-span-1 h-screen min-w-full rounded-lg bg-marine-50 shadow-xl">
          <div className="flex h-full flex-col items-center justify-between gap-8 py-24 ">
            <Button variant="ghost" className="w-full justify-center h-24 text-marine-800 hover:bg-white" >
              <HomeIcon className="mr-2 h-6 w-6" />
              Home
            </Button>
            <Button variant="ghost" className="w-full justify-center h-24 text-marine-800 hover:bg-white" >
              <BarChart3 className="mr-2 h-6 w-6" />
              Analytics
            </Button>
            <Button variant="ghost" className="w-full justify-center h-24 text-marine-800 hover:bg-white">
              <Calendar className="mr-2 h-6 w-6" />
              Events
            </Button>
            <Button variant="ghost" className="w-full justify-center h-24 text-marine-800 hover:bg-white">
              <Contact className="mr-2 h-6 w-6" />
              Profile
            </Button>

            
          </div>
        </div>
        <div className="col-span-4 h-[1200px]">
          <div className="h-full rounded-lg bg-marine-200 px-4 shadow-xl">
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
      </section>
    </main>
  );
};

export default AuthGuardOrganizer(Dashboard);
