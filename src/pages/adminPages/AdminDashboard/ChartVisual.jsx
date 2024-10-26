import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js"; // Ensure you import Chart and registerables
import "./AdminDashboard.css";
Chart.register(...registerables);

/* eslint-disable react/prop-types */

function ChartVisual({ orders }) {
  const today = new Date();
  const todayDateString = today.toLocaleDateString("en-GB");
  const [thisday, thismonth, thisyear] = todayDateString.split("/");

  let salesData = {
    today: 0,
    week: 0,
    month: 0,
    year: 0,
  };

  try {
    const orderDate = orders.map((order) => {
      const dateParts = order.date.split(",")[0].split("/");
      return [
        new Date(dateParts[2], dateParts[1] - 1, dateParts[0]),
        order.amount,
      ];
    });

    for (let x of orderDate) {
      const orderDateObj = x[0];
      const orderAmount = x[1];

      if (
        thisday == orderDateObj.getDate() &&
        thismonth == orderDateObj.getMonth() + 1 &&
        thisyear == orderDateObj.getFullYear()
      ) {
        salesData.today += orderAmount;
      }
      if (Number(thisday) - orderDateObj.getDate() <= 7) {
        salesData.week += orderAmount;
      }
      if (
        thismonth == orderDateObj.getMonth() + 1 &&
        thisyear == orderDateObj.getFullYear()
      ) {
        salesData.month += orderAmount;
      }
      if (thisyear == orderDateObj.getFullYear()) {
        salesData.year += orderAmount;
      }
    }
  } catch (error) {
    console.error("Error calculating sales data:", error);
    return <p>Error calculating chart data.</p>;
  }

  if (Object.values(salesData).every((value) => value === 0)) {
    return <p>No sales data available.</p>;
  }

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
