import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useSelector } from "react-redux";
import "./AdminDashboard.css";

Chart.register(...registerables);

function ChartVisual() {
  // Get revenueRecord from Redux store
  const { revenueRecord } = useSelector((state) => state.order);

  // Check if revenueRecord is available
  if (!revenueRecord) {
    return <p>No sales data available.</p>;
  }

  // Prepare sales data from revenueRecord
  const salesData = {
    today: revenueRecord.dayRevenue,
    week: revenueRecord.weekRevenue,
    month: revenueRecord.monthRevenue,
    year: revenueRecord.yearRevenue,
  };

  // Prepare data for the bar chart
  const data = {
    labels: ["Today", "This Week", "This Month", "This Year"],
    datasets: [
      {
        label: "Sales Amount",
        data: [
          salesData.today,
          salesData.week,
          salesData.month,
          salesData.year,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ChartVisual;
