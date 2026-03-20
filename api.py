from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from agents.traffic_agent import TrafficSignalAgent
from agents.energy_agent import EnergyGridAgent
from agents.environment_agent import EnvironmentalMonitoringAgent
from agents.transit_agent import PublicTransitAgent
from agents.coordinator import ResourceCoordinationAgent
from simulation import run_simulation

app = FastAPI()

# 🔥 VERY IMPORTANT (allows React to talk to Python)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/simulate")
def simulate(data: dict):

    traffic = TrafficSignalAgent("Traffic")
    energy = EnergyGridAgent("Energy")
    env = EnvironmentalMonitoringAgent("Environment")
    transit = PublicTransitAgent("Transit")
    coordinator = ResourceCoordinationAgent("Coordinator")

    log = []

    run_simulation(
        traffic, energy, env, transit, coordinator,
        data, log
    )

    return {
        "traffic": data["traffic"],
        "energy": data["energy"],
        "environment": data["env"],
        "transit": data["transit"],
        "log": log
    }