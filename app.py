import streamlit as st

from agents.traffic_agent import TrafficSignalAgent
from agents.energy_agent import EnergyGridAgent
from agents.environment_agent import EnvironmentalMonitoringAgent
from agents.transit_agent import PublicTransitAgent
from agents.coordinator import ResourceCoordinationAgent, THRESHOLDS

# ===============================
# Streamlit UI
# ===============================

st.set_page_config(page_title="Smart City Agent Demo", layout="wide")
st.title("Smart City Resource Management — Demo")
st.caption("Goal: prove agent communication (detect → request → decision → response).")

col1, col2, col3, col4 = st.columns(4)

with col1:
    st.subheader("Traffic Agent 🚦")
    vehicle_count = st.slider("Vehicle count", 0, 120, 65, 1)

with col2:
    st.subheader("Energy Agent ⚡")
    load_value = st.slider("Energy load value", 0, 120, 90, 1)

with col3:
    st.subheader("Environment Agent 🌫")
    aqi = st.slider("Air Quality Index (AQI)", 0, 200, 120, 1)

with col4:
    st.subheader("Transit Agent 🚌")
    delay_minutes = st.slider("Delay minutes", 0, 30, 15, 1)

run = st.button("Run Simulation", type="primary")

# Status cards (nice for demo)
st.divider()
s1, s2, s3, s4, s5 = st.columns(5)
s1.metric("Traffic: Congestion?", "YES" if vehicle_count > THRESHOLDS["TRAFFIC_CONGESTION"] else "NO")
s2.metric("Energy: Peak Load?", "YES" if load_value > THRESHOLDS["PEAK_LOAD"] else "NO")
s3.metric("Environment: High AQI?", "YES" if aqi > THRESHOLDS["HIGH_POLLUTION"] else "NO")
s4.metric("Transit: Delay?", "YES" if delay_minutes > THRESHOLDS["TRANSIT_DELAY"] else "NO")
s5.metric("Coordinator", "READY")

st.divider()

if run:
    log = []

    coordinator = ResourceCoordinationAgent("Coordinator")
    traffic = TrafficSignalAgent("TrafficAgent")
    energy = EnergyGridAgent("EnergyAgent")
    env = EnvironmentalMonitoringAgent("EnvironmentAgent")
    transit = PublicTransitAgent("TransitAgent")

    inputs = {
        "traffic": vehicle_count,
        "energy": load_value,
        "env": aqi,
        "transit": delay_minutes
    }

    run_simulation(traffic, energy, env, transit, coordinator, inputs, log)

    st.subheader("System Log")
    st.code("\n".join(log), language="text")
else:
    st.info("Set values using the sliders, then click **Run Simulation** to see message passing.")
