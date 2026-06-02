import Chart from "chart.js/auto";
import dataJson from "./datasensor.json";

(async function () {
  try {
    const sensorData = dataJson.datasensorreport[0].sensordata;

    const labels = sensorData.map((item) => item.timestamp.split("T")[0]);
    const temperatures = sensorData.map((item) => item.temperature);
    const humidities = sensorData.map((item) => item.humidity);
    const pressures = sensorData.map((item) => item.pressure);

    new Chart(document.getElementById("chartSensor"), {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temperatures,
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            yAxisID: "y",
          },
          {
            label: "Humidity (%)",
            data: humidities,
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.5)",
            yAxisID: "y",
          },
          {
            label: "Pressure (hPa)",
            data: pressures,
            borderColor: "green",
            backgroundColor: "rgba(0, 128, 0, 0.5)",
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          y: {
            type: "linear",
            position: "left",
            title: { display: true, text: "Temperature / Humidity" },
          },
          y1: {
            type: "linear",
            position: "right",
            title: { display: true, text: "Pressure (hPa)" },
            grid: { drawOnChartArea: false },
          },
        },
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
})();