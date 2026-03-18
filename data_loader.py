import pandas as pd
import random

traffic_df = pd.read_csv("data/Automatic_Traffic_Recorder_ATR_Stations.csv")
energy_df = pd.read_csv("data/US Electric Grid new.csv")
env_df = pd.read_csv("data/Air_Quality_Data.csv")
transit_df = pd.read_csv("data/Regularities_by_liaisons_Trains_France.csv")


def get_numeric_value(df):
    numeric_cols = df.select_dtypes(include=['number']).columns

    if len(numeric_cols) == 0:
        return 0  # fallback

    col = random.choice(numeric_cols)
    value = df[col].dropna().sample(1).values[0]

    return min(max(int(value), 0), 120)

def normalize(value, min_val, max_val):
    return max(min(int(value), max_val), min_val)


def get_traffic_value():
    return normalize(get_numeric_value(traffic_df), 0, 120)

def get_energy_value():
    return normalize(get_numeric_value(energy_df), 0, 120)

def get_env_value():
    return normalize(get_numeric_value(env_df), 0, 200)

def get_transit_delay():
    return normalize(get_numeric_value(transit_df), 0, 30)