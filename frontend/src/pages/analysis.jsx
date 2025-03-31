import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Analysis() {
  const location = useLocation();
  const [analysisData, setAnalysisData] = useState([]);
  const [loading, setLoading] = useState(true);  // 用來追蹤加載狀態
  const [error] = useState(null);  // 用來儲存錯誤訊息
  const navigate = useNavigate();

  useEffect(() => {
    // 確保從路由中獲取的分析數據有效
    if (location.state && location.state.analysisData) {
      setAnalysisData(location.state.analysisData); // 獲取來自前頁面的分析數據
    } else {
      setAnalysisData([]); // 如果數據不存在，設置為空陣列
    }
    setLoading(false); // 停止加載
  }, [location.state?.analysisData]);

  if (loading) {
    return <p>正在加載數據...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="analysis-container">
      <h3 className="analysis-title">關鍵字頻率分析</h3>
      <div className="chart-wrapper">
        {analysisData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={analysisData} margin={{ top: 20, right: 30, left: 30, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="term" interval={0} angle={-30} textAnchor="end" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="frequency" fill="#a5a58d" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>沒有可顯示的數據。</p>
        )}
      </div>
    </div>
  );
}

export default Analysis;
