import type { VitalStats } from '@/types/medicalData';
import { NORMAL_RANGES, VITAL_LABELS, VITAL_COLORS } from '@/utils/constants';
import './VitalStats.css';

interface VitalStatsProps {
  data: VitalStats;
}

const VitalStats = ({ data }: VitalStatsProps) => {
  const renderStatCard = (
    title: string,
    current: number,
    min: number,
    max: number,
    avg: number,
    normalRange: { min: number; max: number },
    color: string
  ) => {
    const isNormal = current >= normalRange.min && current <= normalRange.max;
    
    return (
      <div className="stat-card" style={{ borderColor: color }}>
        <h3 style={{ color }}>{title}</h3>
        <div className={`current-value ${isNormal ? '' : 'abnormal'}`}>
          {current.toFixed(1)}
          {!isNormal && <span className="warning-icon">⚠️</span>}
        </div>
        <div className="stat-details">
          <div>
            <span>Min:</span> {min.toFixed(1)}
          </div>
          <div>
            <span>Max:</span> {max.toFixed(1)}
          </div>
          <div>
            <span>Avg:</span> {avg.toFixed(1)}
          </div>
        </div>
        <div className="normal-range">
          Normal: {normalRange.min}-{normalRange.max}
        </div>
      </div>
    );
  };

  return (
    <div className="stats-container">
      {renderStatCard(
        VITAL_LABELS.spO2,
        data.current.spO2,
        data.min.spO2,
        data.max.spO2,
        data.avg.spO2,
        NORMAL_RANGES.spO2,
        VITAL_COLORS.spO2
      )}
      {renderStatCard(
        VITAL_LABELS.heartRate,
        data.current.heartRate,
        data.min.heartRate,
        data.max.heartRate,
        data.avg.heartRate,
        NORMAL_RANGES.heartRate,
        VITAL_COLORS.heartRate
      )}
      {renderStatCard(
        VITAL_LABELS.temperature,
        data.current.temperature,
        data.min.temperature,
        data.max.temperature,
        data.avg.temperature,
        NORMAL_RANGES.temperature,
        VITAL_COLORS.temperature
      )}
    </div>
  );
};

export default VitalStats;