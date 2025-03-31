import logging
import os
import pandas as pd
import torch
import uvicorn
from fastapi import FastAPI, UploadFile, File
from transformers import BertTokenizer, BertModel
from collections import Counter
from fastapi.responses import JSONResponse

from fastapi.middleware.cors import CORSMiddleware

# 設置日誌
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(message)s')

# 創建 FastAPI 應用
app = FastAPI(docs_url="/docs")
# 添加 CORS 中介軟體
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允許所有來源發送請求
    allow_credentials=True,
    allow_methods=["*"],  # 允許所有方法
    allow_headers=["*"],  # 允許所有標頭
)

# 設定模型路徑
model_path = os.path.join(os.path.dirname(__file__), 'models')

# 加載 BERT 模型和分詞器
logging.info("加載 BERT 模型和分詞器...")
tokenizer = BertTokenizer.from_pretrained(model_path)
model = BertModel.from_pretrained(model_path)
logging.info("模型加載完成！")

# 測試 API
@app.get("/hello")
async def hello():
    return {"message": "Hello World"}

@app.post("/analyze")
async def analyze_file(file: UploadFile = File(...)):
    try:
        logging.info(f"收到文件: {file.filename}")

        # 讀取文件內容作為純文本
        content = await file.read()

        # 將內容轉為字串，再讀取為 DataFrame
        text_analysis = content.decode('utf-8', errors='ignore')

        # 打印文件內容，檢查是否正確讀取
        logging.info(f"文件內容：\n{text_analysis[:500]}")  # 顯示前 500 字

        # 檢查是否為有效 CSV 格式
        if not text_analysis.strip():  # 空文件處理
            return {"error": "文件內容為空"}
        
        # 嘗試將純文本轉換為 CSV 格式
        from io import StringIO
        data = StringIO(text_analysis)
        
        try:
            df = pd.read_csv(data, sep=',', header=0)
        except pd.errors.EmptyDataError:
            return {"error": "CSV 文件內容為空或格式無效"}

        # 檢查是否成功讀取欄位
        if df.empty:
            return {"error": "無法解析 CSV 文件，文件可能為空或格式不正確"}

        # 檢查是否有 'transcription' 欄位
        if 'transcription' not in df.columns:
            # 如果沒有 'transcription' 欄位，查看其他欄位名稱
            available_columns = df.columns.tolist()
            return {"error": f"缺少 'transcription' 欄位，檔案可用的欄位: {available_columns}"}

        # 取出 'transcription' 欄位的文本
        texts = df['transcription'].astype(str).tolist()
        text_analysis = " ".join(texts)
        logging.info(f"合併文本（前 500 字）: {text_analysis[:500]}")

        if not text_analysis.strip():
            return {"error": "文件內容為空"}

        # 進行分詞與關鍵字統計
        inputs = tokenizer(text_analysis, return_tensors="pt", truncation=True, max_length=512)
        words = tokenizer.convert_ids_to_tokens(inputs['input_ids'].squeeze(0))
        word_counts = Counter(words)

        # 取得前 10 個關鍵字
        top_keywords = [{"term": term, "frequency": count} for term, count in word_counts.most_common(10)]
        logging.info(f"關鍵字分析結果: {top_keywords}")

        return {"analysis": top_keywords}

    except Exception as e:
        logging.error(f"錯誤: {str(e)}")
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8080)
