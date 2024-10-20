import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js"; // Ensure you import Chart and registerables
import "./AdminDashboard.css";
Chart.register(...registerables);

function ProfitChart() {
  // Dummy values for yearly profit and loss
  const yearlyData = {
    profit: 8000, // Total profit for the year
    loss: 2000, // Total loss for the year
  };

  // Prepare data for the donut chart
  const data = {
    labels: ["Profit", "Loss"],
    datasets: [
      {
        label: "Yearly Financial Overview",
        data: [yearlyData.profit, yearlyData.loss],
        backgroundColor: [
          "rgba(75, 192, 192, 0.7)", // Color for profit
          "rgba(255, 99, 132, 0.7)", // Color for loss
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)", // Border color for profit
          "rgba(255, 99, 132, 1)", // Border color for loss
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options} />;
    </div>
  );
}

export default ProfitChart;
