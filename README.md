 
# 醫療病歷分析平台 (Medical Record Analysis Platform)

![醫療病歷分析平台](https://img.shields.io/badge/版本-1.0.0-blue)

## 專案概述

醫療病歷分析平台是一個結合大型語言模型(Large Language Models, LLM)與網頁應用的智慧醫療解決方案，專為醫療專業人員設計。本平台能夠自動分析醫療病歷文本，提取關鍵詞彙，並通過視覺化圖表呈現分析結果，幫助醫護人員快速把握病歷核心信息，提高工作效率。

本專案採用前後端分離架構，後端使用Python FastAPI框架與BERT模型進行自然語言處理，前端使用React與Vite構建直觀的用戶界面，實現了醫療文本的智能分析與視覺化呈現。

## 技術架構

### 後端技術

- **框架**: FastAPI
- **語言模型**: BERT (使用Hugging Face transformers庫)
- **數據處理**: Pandas
- **深度學習**: PyTorch
- **Web服務**: Uvicorn

### 前端技術

- **框架**: React
- **構建工具**: Vite
- **路由**: React Router
- **UI組件**: MUI (Material-UI)
- **數據可視化**: Recharts
- **HTTP客戶端**: Axios

### 系統架構圖

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│             │      │             │      │             │
│  React 前端  │<────>│ FastAPI 後端 │<────>│  BERT 模型  │
│             │      │             │      │             │
└─────────────┘      └─────────────┘      └─────────────┘
```

## 功能特點

1. **醫療文件上傳與處理**
   - 支持多種文件格式 (TXT, CSV, XML, JSON)
   - 文件格式驗證與錯誤處理
   - 安全的文件上傳機制

2. **智能文本分析**
   - 基於BERT模型的醫療文本分析
   - 關鍵詞提取與頻率統計
   - 專業醫學術語識別

3. **分析結果視覺化**
   - 關鍵詞頻率柱狀圖
   - 直觀的數據呈現
   - 響應式設計，適配不同設備

4. **用戶友好界面**
   - 簡潔直觀的操作流程
   - 實時錯誤提示
   - 加載狀態指示

## 安裝指南

### 前置需求

- Python 3.8+
- Node.js 14+
- npm 或 yarn

### 後端設置

1. 克隆專案
   ```bash
   git clone https://github.com/zhiyu0415/medical_platform.git
   cd medical_platform
   ```

2. 安裝後端依賴
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. 下載BERT模型
   - 從Google Drive下載預訓練模型: [模型下載連結](https://drive.google.com/file/d/1Wi_to9YfyrcnBVK_cdT7aJ81Om7GPAkC/view?usp=drive_link)
   - 將下載的模型文件解壓到 `backend/models` 目錄

4. 啟動後端服務
   ```bash
   python app.py
   ```
   服務將在 http://127.0.0.1:8000 運行

### 前端設置

1. 安裝前端依賴
   ```bash
   cd ../frontend
   npm install
   ```

2. 啟動開發服務器
   ```bash
   npm run dev
   ```
   前端將在 http://localhost:5173 運行

### Docker部署 (可選)

專案包含Dockerfile，支持容器化部署:

```bash
# 構建後端容器
cd backend
docker build -t medical-platform-backend .

# 構建前端容器
cd ../frontend
docker build -t medical-platform-frontend .

# 運行容器
docker run -d -p 8000:8000 medical-platform-backend
docker run -d -p 80:80 medical-platform-frontend
```

## 使用說明

1. **上傳醫療文件**
   - 訪問平台首頁
   - 點擊"選擇文件"按鈕上傳醫療病歷文件 (支持TXT, CSV, XML, JSON格式)
   - 選擇文件後，點擊"分析檔案"按鈕

2. **查看分析結果**
   - 系統自動處理上傳的文件並提取關鍵詞
   - 分析完成後自動跳轉到結果頁面
   - 查看關鍵詞頻率柱狀圖，了解病歷核心內容

3. **錯誤處理**
   - 如遇到文件格式錯誤，系統會顯示相應提示
   - 確保上傳的CSV文件包含'transcription'欄位

## 系統工作流程

1. 用戶通過前端界面上傳醫療病歷文件
2. 前端驗證文件格式，確保符合要求
3. 文件通過API發送至後端服務器
4. 後端使用BERT模型分析文本內容，提取關鍵詞
5. 分析結果返回前端
6. 前端使用Recharts庫將結果以柱狀圖形式呈現

## 開發者信息

本專案由[zhiyu0415](https://github.com/zhiyu0415)開發，作為醫療文本分析的實用工具。

## 授權協議

本專案採用MIT授權協議。詳情請參閱LICENSE文件。

## 未來展望

- 增加更多語言模型選項，如GPT系列
- 實現更豐富的視覺化圖表
- 添加用戶認證與權限管理
- 開發更多專業醫療文本分析功能
- 支持更多語言的醫療文本分析
