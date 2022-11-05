import { useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { useSocket } from "../hooks/useSocket";
Chart.register(...registerables);

let myChart;

export const VotingChart = () => {
  const { socket } = useSocket();

  useEffect(() => {
    socket.on("current-candidates", (candidates) => {
      createChart(candidates);
    });

    return () => socket.off("current-candidates");
  }, [socket]);

  const createChart = (candidates = []) => {
    const ctx = document.getElementById("myChart");

    if (myChart) myChart.destroy();

    myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: candidates.map((candidate) => candidate.name),
        datasets: [
          {
            label: "# of Votes",
            data: candidates.map((candidate) => candidate.votes),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        indexAxis: "y",
        scales: {
          x: {
            stack: true,
          },
        },
      },
    });

    return () => ctx.remove();
  };

  return <canvas id="myChart"></canvas>;
};
