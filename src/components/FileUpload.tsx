// src/components/FileUpload.tsx
import { useCallback } from 'react';
import * as XLSX from 'xlsx';
import './FileUpload.css';

interface FileUploadProps {
  onUpload: (data: any[]) => void;
}

const FileUpload = ({ onUpload }: FileUploadProps) => {
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet);
          onUpload(jsonData);
        } catch (error) {
          console.error('Error parsing file:', error);
          alert('Error parsing file. Please check the file format.');
        }
      };
      reader.readAsArrayBuffer(file);
    },
    [onUpload]
  );

  const handleDefaultData = useCallback(async () => {
    try {
      const response = await fetch('/default-data/Medical_Readings_Normal.xlsx');
      const data = await response.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
      onUpload(jsonData);
    } catch (error) {
      console.error('Error loading default data:', error);
      alert('Error loading default data. Please try again.');
    }
  }, [onUpload]);

  return (
    <div className="file-upload-container">
      <label className="file-upload-label">
        <span>Upload Medical Data (Excel/CSV)</span>
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
          className="file-upload-input"
        />
      </label>
      <div className="default-data-container">
        <button onClick={handleDefaultData} className="default-data-button">
          Use Default Data 
        </button>
      </div>
    </div>
  );
};

export default FileUpload;