import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    labels: {
      font: {
        family: "Kanit",
      },
    },
    Tooltip: {
      titleFont: {
        family: "Kanit",
      },
    },
    legend: {
      position: "top",
    },
  },
};



export function ReportChart({men, women, other}) {
  const data = {
    labels: ['คะแนนเฉลี่ย'],
    datasets: [
      {
        label: "ชาย",
        // data: men,
        data: ["10", "20", "80"],
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
      {
        label: "หญิง",
        // data: women,
        data: ["10", "20", "80"],
        backgroundColor: "rgba(53, 162, 235, 0.7)",
      },
      {
        label: "อื่น ๆ",
        // data: other,
        data: ["10", "20", "80"],
        backgroundColor: "rgba(255, 99, 50, 0.7)",
      },
    ],
  };

  return <><Bar options={options} data={data} /></>;
}
