export interface MedicalReading {
    timestamp: string;
    spO2: number;
    heartRate: number;
    temperature: number;
    isAnomaly?: boolean;
  }
  
  export type VitalSign = 'spO2' | 'heartRate' | 'temperature';
  
  export interface VitalStats {
    current: {
      spO2: number;
      heartRate: number;
      temperature: number;
    };
    min: {
      spO2: number;
      heartRate: number;
      temperature: number;
    };
    max: {
      spO2: number;
      heartRate: number;
      temperature: number;
    };
    avg: {
      spO2: number;
      heartRate: number;
      temperature: number;
    };
  }