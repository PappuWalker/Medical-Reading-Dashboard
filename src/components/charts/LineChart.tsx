import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // This will now work after installing the package
import { MedicalReading } from '@/types/medicalData';
import { VITAL_COLORS } from '@/utils/constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

interface LineChartProps {
  data: MedicalReading[];
}

const LineChart = ({ data }: LineChartProps) => {
  const chartData = {
    datasets: [
      {
        label: 'SpO₂ (%)',
        data: data.map(d => ({
          x: new Date(d.timestamp),
          y: d.spO2,
          anomaly: d.isAnomaly
        })),
        borderColor: VITAL_COLORS.spO2,
        backgroundColor: `${VITAL_COLORS.spO2}40`,
        yAxisID: 'y',
        pointRadius: (ctx: any) => (ctx.raw.anomaly ? 6 : 3),
        pointBackgroundColor: (ctx: any) =>
          ctx.raw.anomaly ? '#ff0000' : VITAL_COLORS.spO2,
        tension: 0.1,
        fill: true
      },
      {
        label: 'Heart Rate (bpm)',
        data: data.map(d => ({
          x: new Date(d.timestamp),
          y: d.heartRate,
          anomaly: d.isAnomaly
        })),
        borderColor: VITAL_COLORS.heartRate,
        backgroundColor: `${VITAL_COLORS.heartRate}40`,
        yAxisID: 'y1',
        pointRadius: (ctx: any) => (ctx.raw.anomaly ? 6 : 3),
        pointBackgroundColor: (ctx: any) =>
          ctx.raw.anomaly ? '#ff0000' : VITAL_COLORS.heartRate,
        tension: 0.1
      },
      {
        label: 'Temperature (°F)',
        data: data.map(d => ({
          x: new Date(d.timestamp),
          y: d.temperature,
          anomaly: d.isAnomaly
        })),
        borderColor: VITAL_COLORS.temperature,
        backgroundColor: `${VITAL_COLORS.temperature}40`,
        yAxisID: 'y2',
        pointRadius: (ctx: any) => (ctx.raw.anomaly ? 6 : 3),
        pointBackgroundColor: (ctx: any) =>
          ctx.raw.anomaly ? '#ff0000' : VITAL_COLORS.temperature,
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'minute' as const,
          displayFormats: {
            minute: 'HH:mm'
          }
        },
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'SpO₂ (%)'
        },
        min: 80,
        max: 110
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false
        },
        title: {
          display: true,
          text: 'Heart Rate (bpm)'
        },
        min: 30,
        max: 200
      },
      y2: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false
        },
        title: {
          display: true,
          text: 'Temperature (°F)'
        },
        min: 70,
        max: 110,
        offset: true
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            const anomaly = context.raw.anomaly;
            return `${label}: ${value}${anomaly ? ' (Anomaly)' : ''}`;
          }
        }
      }
    }
  };

  return <Line options={options} data={chartData} />;
};

export default LineChart;