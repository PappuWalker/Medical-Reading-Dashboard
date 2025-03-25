import { MedicalReading } from '@/types/medicalData';
import './DataTable.css';

interface DataTableProps {
  data: MedicalReading[];
}

const DataTable = ({ data }: DataTableProps) => {
  return (
    <div className="table-container">
      <h2>Raw Data</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>SpO₂ (%)</th>
              <th>Heart Rate (bpm)</th>
              <th>Temperature (°F)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((reading, index) => (
              <tr key={index} className={reading.isAnomaly ? 'anomaly' : ''}>
                <td>{new Date(reading.timestamp).toLocaleString()}</td>
                <td>{reading.spO2}</td>
                <td>{reading.heartRate}</td>
                <td>{reading.temperature.toFixed(1)}</td>
                <td>{reading.isAnomaly ? '⚠️ Anomaly' : 'Normal'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;