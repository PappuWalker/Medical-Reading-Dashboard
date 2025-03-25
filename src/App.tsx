import { useState } from 'react';
import { parseMedicalData, calculateStats } from '@/utils/dataParser';
import Layout from '@/components/Layout';
import FileUpload from '@/components/FileUpload';
import VitalStats from '@/components/charts/VitalStats';
import LineChart from '@/components/charts/LineChart';
import DataTable from '@/components/DataTable';
import { MedicalReading } from '@/types/medicalData';

function App() {
  const [medicalData, setMedicalData] = useState<MedicalReading[]>([]);

  const handleFileUpload = (data: any[]) => {
    const parsedData = parseMedicalData(data);
    setMedicalData(parsedData);
  };

  const stats = calculateStats(medicalData);

  return (
    <Layout>
      <FileUpload onUpload={handleFileUpload} />
      {medicalData.length > 0 && (
        <>
          <VitalStats data={stats} />
          <div className="chart-container">
            <LineChart data={medicalData} />
          </div>
          <DataTable data={medicalData} />
        </>
      )}
    </Layout>
  );
}

export default App;