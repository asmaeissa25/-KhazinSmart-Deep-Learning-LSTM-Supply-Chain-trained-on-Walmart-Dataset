from fastapi import FastAPI
import tensorflow as tf
import numpy as np
from pydantic import BaseModel
import joblib
from fastapi.middleware.cors import CORSMiddleware

# 1. Initialize FastAPI App
app = FastAPI(title="SmartStock AI - Inventory Forecast")

# 2. Add CORS Middleware (Darouri bach React y-hder m3a Python)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Load l-Files (Model w Scaler)
# T-akkdi ana had l-fichiyat f nefs l-folder m3a main.py
try:
    model = tf.keras.models.load_model('inventory_model.h5')
    scaler = joblib.load('scaler.pkl')
    print("✅ Model and Scaler loaded successfully!")
except Exception as e:
    print(f"❌ Error loading files: {e}")

# 4. Define l-format dyal l-data
class SalesData(BaseModel):
    last_4_weeks: list 
    current_stock: float

@app.get("/")
def home():
    return {"message": "SmartStock AI API is running!"}

@app.post("/predict")
def predict_stock(data: SalesData):
    # 1. Preprocessing dyal 4 s-simanat l-lakhrine
    input_data = np.array(data.last_4_weeks).reshape(-1, 1)
    current_batch = scaler.transform(input_data).reshape(1, 4, 1)
    
    predictions_scaled = []

    # 2. Loop bach n-twaqq3o 4 d-simanat (Ch-har)
    for _ in range(4):
        # Predict s-smana l-jaya
        pred = model.predict(current_batch)
        predictions_scaled.append(pred[0])
        
        # Update current_batch: 7iyed s-smana l-oula w zid t-waqqo3 j-jdid
        # [W1, W2, W3, W4] -> [W2, W3, W4, Pred]
        new_entry = pred.reshape(1, 1, 1)
        current_batch = np.append(current_batch[:, 1:, :], new_entry, axis=1)

    # 3. Inverse transform bach n-rej3o l-malyoun
    final_predictions = scaler.inverse_transform(predictions_scaled)
    
    # Logic dyal s-stock (t-waqqo3 dyal ch-har kamel)
    total_predicted_sales = sum([float(p[0]) for p in final_predictions])
    alert = total_predicted_sales > data.current_stock

    return {
        "weekly_forecast": [round(float(p[0]), 2) for p in final_predictions],
        "total_predicted_sales": round(total_predicted_sales, 2),
        "reorder_alert": alert,
        "recommendation": "⚠️ Monthly Risk: Restock Now!" if alert else "✅ Stock Level: Secure for 30 days"
    }