import pandas as pd
import random

# Load datasets once
traffic_df = pd.read_csv("Automatic_Traffic_Recorder_ATR_Stations.csv")
energy_df = pd.read_csv("US Electric Grid new.csv")
env_df = pd.read_csv("Air_Quality_Data.csv")
transit_df = pd.read_csv("Regularities_by_liaisons_Trains_France.csv")


def get_traffic_value():
    row = traffic_df.sample(1)
    return int(row.iloc[0][1])  # adjust column index if needed


def get_energy_value():
    row = energy_df.sample(1)
    return int(row.iloc[0][1])


def get_env_value():
    row = env_df.sample(1)
    return int(row.iloc[0][1])


def get_transit_delay():
    row = transit_df.sample(1)
    return int(row.iloc[0][1])