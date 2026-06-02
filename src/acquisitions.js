import Chart from "chart.js/auto";
import dataJson from "./datasensor.json";

(async function () {
  try {
    const response = { ok: true, json: async () => dataJson };
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonData = await response.json();

    const sensorData = jsonData.datasensorreport[0].sensordata;

    const labels = sensorData.map((item) => item.timestamp.split("T")[0]);
    const temperatures = sensorData.map((item) => item.temperature);
    const humidities = sensorData.map((item) => item.humidity);
    const pressures = sensorData.map((item) => item.pressure);

    new Chart(document.getElementById("chartTemperature"), {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temperatures,
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
          },
        ],
      },
    });

    new Chart(document.getElementById("chartHumidity"), {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Humidity (%)",
            data: humidities,
            borderColor: "blue",
            backgroundColor: "rgba(0, 0, 255, 0.5)",
          },
        ],
      },
    });

    new Chart(document.getElementById("chartPressure"), {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Pressure (hPa)",
            data: pressures,
            borderColor: "green",
            backgroundColor: "rgba(0, 128, 0, 0.5)",
          },
        ],
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
})();