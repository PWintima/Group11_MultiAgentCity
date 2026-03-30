from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 🔧 AGENTS
from agents.traffic_agent import TrafficSignalAgent
from agents.energy_agent import EnergyGridAgent
from agents.environment_agent import EnvironmentalMonitoringAgent
from agents.transit_agent import PublicTransitAgent
from agents.coordinator import ResourceCoordinationAgent, THRESHOLDS

# 🔥 REAL DATA SIMULATION
from realTimeMonitoring_and_predictions.simulation import run_real_simulation

# ==============================
# 🚀 INIT APP
# ==============================
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# 🔧 SET THRESHOLDS
# ==============================
@app.post("/set-thresholds")
def set_thresholds(data: dict):
    THRESHOLDS.update(data)
    return {
        "status": "updated",
        "thresholds": THRESHOLDS
    }

# ==============================
# 🚀 RUN SIMULATION
# ==============================
@app.post("/simulate")
def simulate(data: dict):

    log = []

    # 🔥 1. RUN REAL DATA SIMULATION (ML + CSV)
    run_real_simulation(log)

    # 🔥 2. INITIALIZE AGENTS (YOUR SYSTEM)
    traffic = TrafficSignalAgent("Traffic")
    energy = EnergyGridAgent("Energy")
    env = EnvironmentalMonitoringAgent("Environment")
    transit = PublicTransitAgent("Transit")
    coordinator = ResourceCoordinationAgent("Coordinator")

    # 🔥 3. SIMPLE TRIGGER LOGIC (BASED ON FRONTEND VALUES)

    if data["traffic"] > THRESHOLDS.get("traffic", 80):
        coordinator.receive_request("Traffic Congestion", priority=7)
        log.append({"message": "Traffic Agent: Congestion detected"})

    if data["energy"] > THRESHOLDS.get("energy", 80):
        coordinator.receive_request("Peak Energy Load", priority=6)
        log.append({"message": "Energy Agent: High load detected"})

    if data["env"] > THRESHOLDS.get("env", 150):
        coordinator.receive_request("High Air Pollution", priority=5)
        log.append({"message": "Environment Agent: Pollution detected"})

    if data["transit"] > THRESHOLDS.get("transit", 20):
        coordinator.receive_request("Transit Delay", priority=4)
        log.append({"message": "Transit Agent: Delay detected"})

    # 🔥 4. BUILD QUEUE RESPONSE
    queue = [
        {
            "type": req.request_type,
            "priority": req.priority_level
        }
        for _, req in coordinator.request_queue
    ]

    return {
        "logs": log,
        "queue": queue
    }