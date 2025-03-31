import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Button } from '@mui/material';
import axios from 'axios';
import '../index.css';

function MedicalAnalysisPlatform() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 處理文件選擇
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && !selectedFile.name.match(/\.(txt|csv|xml|json)$/)) {
      setError('請上傳有效的檔案格式（.txt、.csv、.xml、.json）');
    } else {
      setError('');
      setFile(selectedFile);
    }
  };

  // 分析按鈕處理
  const handleAnalyze = async () => {
    if (!file) {
      setError('請先上傳檔案再進行分析。');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    // 發送檔案至後端進行分析
    const response = await axios.post('http://127.0.0.1:8080/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // 跳轉至分析結果頁面，並傳遞數據
    navigate('/analysis', { state: { analysisData: response.data.analysis } });
  };

  return (
    <div className="p-4 morandi-bg">
      <Card className="mb-4">
        <CardContent>
          <h2 className="text-xl font-bold mb-2 morandi-text">病歷檢閱分析平台</h2>
          <div className="file-input-wrapper">
            <input type="file" onChange={handleFileChange} className="file-input" />
            <Button onClick={handleAnalyze} variant="contained" style={{ backgroundColor: '#B1A7A6', color: '#FFFFFF' }}>
              分析檔案
            </Button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </CardContent>
      </Card>
    </div>
  );
}

export default MedicalAnalysisPlatform;
