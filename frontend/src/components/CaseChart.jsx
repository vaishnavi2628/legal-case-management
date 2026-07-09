import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
  } from "chart.js";
  
  import { Pie } from "react-chartjs-2";
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  
  function CaseChart({ stats }) {
    const data = {
      labels: ["Pending", "Closed", "In Progress"],
      datasets: [
        {
          data: [
            stats.pendingCases,
            stats.closedCases,
            stats.inProgressCases,
          ],
          backgroundColor: [
            "#FACC15",
            "#22C55E",
            "#3B82F6",
          ],
        },
      ],
    };
  
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          Case Status Overview
        </h2>
  
        <div className="w-72 mx-auto">
          <Pie data={data} />
        </div>
      </div>
    );
  }
  
  export default CaseChart;