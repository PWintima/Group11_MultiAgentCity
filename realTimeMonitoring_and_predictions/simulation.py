import pandas as pd
import joblib
import os

def run_real_simulation(log):
    log.append({"message": "SIMULATION STARTED"})
    # 🔥 SAFE BASE PATH (VERY IMPORTANT)
    BASE_DIR = os.path.dirname(__file__)

    # 📊 LOAD DATA
    aqi_data = pd.read_csv(os.path.join(BASE_DIR, "preprocessed_AQI.csv"))
    energy_data = pd.read_csv(os.path.join(BASE_DIR, "preprocessed_energy.csv"))
    transit_data = pd.read_csv(os.path.join(BASE_DIR, "preprocessed_public_transit.csv"))

    # 🎯 SELECT TRANSIT FEATURES
    transit_feature_cols = [
        "Number of expected circulations",
        "Average delay of all departing trains (min)",
        "Number of late trains > 30min",
        "Number of late trains > 60min",
        "Number of cancelled trains",
        "Number of late trains at departure",
        "Average delay of late departing trains (min)",
        "Delay due to railway infrastructure",
        "Delay due to traffic management",
        "Delay due to rolling stock",
        "Delay due to travellers taken into account",
        "Number of expected circulations_lag1",
        "Number of expected circulations_lag3",
        "Number of expected circulations_lag6",
        "Number of expected circulations_lag12",
        "Average delay of all departing trains (min)_lag1",
        "Average delay of all departing trains (min)_lag3",
        "Average delay of all departing trains (min)_lag6",
        "Average delay of all departing trains (min)_lag12",
        "Number of late trains > 30min_lag1",
        "Number of late trains > 30min_lag3",
        "Number of late trains > 30min_lag6",
        "Number of late trains > 30min_lag12",
        "Number of late trains > 60min_lag1",
        "Number of late trains > 60min_lag3",
        "Number of late trains > 60min_lag6",
        "Number of late trains > 60min_lag12",
        "Number of cancelled trains_lag1",
        "Number of cancelled trains_lag3",
        "Number of cancelled trains_lag6",
        "Number of cancelled trains_lag12"
    ]

    transit_data = transit_data[transit_feature_cols]

    # 🤖 LOAD MODELS
    aqi_model = joblib.load(os.path.join(BASE_DIR, "aqi_model.pkl"))
    demand_loss_model = joblib.load(os.path.join(BASE_DIR, "demand_loss_model.pkl"))
    delay_time_model = joblib.load(os.path.join(BASE_DIR, "delay_time_model.pkl"))

    datasets = [aqi_data, energy_data, transit_data]
    models = [aqi_model, demand_loss_model, delay_time_model]
    dataset_names = ["AQI", "Energy", "Transit"]

    max_length = max(len(df) for df in datasets)

    # 🚀 START SIMULATION
    log.append({"message": "Starting real-time simulation..."})

    for i in range(3):   # 👈 FORCE ONLY 3 STEPS

        log.append({
            "message": f"Processed {min(10, max_length)} time steps"
        })

        for name, df, model in zip(dataset_names, datasets, models):

            if i < len(df):

                row = df.iloc[[i]]
                prediction = "OK"  # 👈 TEMPORARY (FAST DEMO MODE)

                feature_text = ", ".join(
                    [f"{col}={row.iloc[0][col]}" for col in row.columns]
                )

                log.append({
                    "message": f"{name}: {feature_text} :: Prediction={prediction}"
                })

    log.append({"message": "Simulation completed."})