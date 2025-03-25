import { MedicalReading, VitalStats  } from '@/types/medicalData';

export const parseMedicalData = (data: any[]): MedicalReading[] => {
  return data
    .filter(row => row.Timestamp || row.timestamp) // Filter out empty rows
    .map(row => {
      const spO2 = Number(row.SpO2 || row.Spo2 || row.spO2);
      const heartRate = Number(row['Heart Rate'] || row.heartRate);
      const temperature = Number(row.Temperature || row.temperature);

      return {
        timestamp: row.Timestamp || row.timestamp,
        spO2,
        heartRate,
        temperature,
        isAnomaly: detectAnomalies(spO2, heartRate, temperature)
      };
    });
};

const detectAnomalies = (spO2: number, heartRate: number, temperature: number): boolean => {
  // Flag obvious sensor errors and physiologically impossible values
  return (
    spO2 === -999 ||
    heartRate === -499 ||
    temperature < 50 ||
    spO2 > 100 ||
    heartRate < 30 ||
    heartRate > 200 ||
    temperature > 110
  );
};

export const calculateStats = (data: MedicalReading[]): VitalStats => {
  if (data.length === 0) {
    return {
      current: { spO2: 0, heartRate: 0, temperature: 0 },
      min: { spO2: 0, heartRate: 0, temperature: 0 },
      max: { spO2: 0, heartRate: 0, temperature: 0 },
      avg: { spO2: 0, heartRate: 0, temperature: 0 }
    };
  }

  const validData = data.filter(d => !d.isAnomaly);
  const lastReading = validData[validData.length - 1] || data[data.length - 1];

  return {
    current: {
      spO2: lastReading.spO2,
      heartRate: lastReading.heartRate,
      temperature: lastReading.temperature
    },
    min: {
      spO2: Math.min(...validData.map(d => d.spO2)),
      heartRate: Math.min(...validData.map(d => d.heartRate)),
      temperature: Math.min(...validData.map(d => d.temperature))
    },
    max: {
      spO2: Math.max(...validData.map(d => d.spO2)),
      heartRate: Math.max(...validData.map(d => d.heartRate)),
      temperature: Math.max(...validData.map(d => d.temperature))
    },
    avg: {
      spO2: validData.reduce((sum, d) => sum + d.spO2, 0) / validData.length,
      heartRate: validData.reduce((sum, d) => sum + d.heartRate, 0) / validData.length,
      temperature: validData.reduce((sum, d) => sum + d.temperature, 0) / validData.length
    }
  };
};