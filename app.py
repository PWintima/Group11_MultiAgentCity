import streamlit as st

# ===============================
# Minimal Agent System (Sprint 1)
# ===============================

class Agent:
    def __init__(self, agent_id):
        self.agent_id = agent_id
        self.status = "ACTIVE"

    def send_message(self, receiver, message, log):
        log.append(f"[{self.agent_id}] → Sending request to {receiver.agent_id}")
        receiver.receive_message(message, log)

    def receive_message(self, message, log):
        log.append(f"[{self.agent_id}] ← Received: {message}")

class Request:
    def __init__(self, request_id, source_agent, priority_level, request_type):
        self.request_id = request_id
        self.source_agent = source_agent
        self.priority_level = priority_level
        self.request_type = request_type
        self.decision_status = "PENDING"

    def __str__(self):
        return f"Request(type={self.request_type}, priority={self.priority_level})"

class ResourceCoordinationAgent(Agent):
    def receive_message(self, request, log):
        log.append(f"[Coordinator] Evaluating {request}")
        decision = self.evaluate_conflict(request)
        self.send_decision(request.source_agent, decision, log)

    def evaluate_conflict(self, request):
        # Simple Sprint 1 rule
        request.decision_status = "APPROVED" if request.priority_level >= 5 else "DENIED"
        return request.decision_status

    def send_decision(self, target_agent, decision, log):
        log.append(f"[Coordinator] Decision: {decision}")
        target_agent.receive_message(decision, log)

class TrafficSignalAgent(Agent):
    def detect_congestion(self, vehicle_count, log):
        log.append(f"[Traffic] vehicle_count = {vehicle_count}")
        return vehicle_count > 50

    def request_coordination(self, coordinator, log):
        req = Request("REQ-T1", self, 7, "TRAFFIC_CONGESTION")
        self.send_message(coordinator, req, log)

    def receive_message(self, decision, log):
        log.append(f"[Traffic] Decision received: {decision}")
        if decision == "APPROVED":
            log.append("[Traffic] Action: Adjusting signal timing")

class EnergyGridAgent(Agent):
    def detect_peak_load(self, load_value, log):
        log.append(f"[Energy] load_value = {load_value}")
        return load_value > 80

    def request_coordination(self, coordinator, log):
        req = Request("REQ-E1", self, 6, "PEAK_LOAD")
        self.send_message(coordinator, req, log)

    def receive_message(self, decision, log):
        log.append(f"[Energy] Decision received: {decision}")
        if decision == "APPROVED":
            log.append("[Energy] Action: Applying load balancing")

class EnvironmentalMonitoringAgent(Agent):
    def detect_pollution(self, aqi, log):
        log.append(f"[Environment] AQI = {aqi}")
        return aqi > 100

    def request_coordination(self, coordinator, log):
        req = Request("REQ-ENV1", self, 8, "HIGH_POLLUTION")
        self.send_message(coordinator, req, log)

    def receive_message(self, decision, log):
        log.append(f"[Environment] Decision received: {decision}")
        if decision == "APPROVED":
            log.append("[Environment] Action: Triggering environmental alert")


# ===============================
# Streamlit UI
# ===============================

st.set_page_config(page_title="Smart City Agent Demo", layout="wide")
st.title("Smart City Resource Management — Demo")
st.caption("Goal: prove agent communication (detect → request → decision → response).")

col1, col2, col3 = st.columns(3)

with col1:
    st.subheader("Traffic Agent 🚦")
    vehicle_count = st.slider("Vehicle count", 0, 120, 65, 1)

with col2:
    st.subheader("Energy Agent ⚡")
    load_value = st.slider("Energy load value", 0, 120, 90, 1)

with col3:
    st.subheader("Environment Agent 🌫")
    aqi = st.slider("Air Quality Index (AQI)", 0, 200, 120, 1)

run = st.button("Run Simulation", type="primary")

# Status cards (nice for demo)
st.divider()
s1, s2, s3, s4 = st.columns(4)
s1.metric("Traffic: Congestion?", "YES" if vehicle_count > 50 else "NO")
s2.metric("Energy: Peak Load?", "YES" if load_value > 80 else "NO")
s3.metric("Environment: High AQI?", "YES" if aqi > 100 else "NO")
s4.metric("Coordinator", "READY")

st.divider()

if run:
    log = []
    coordinator = ResourceCoordinationAgent("Coordinator")
    traffic = TrafficSignalAgent("TrafficAgent")
    energy = EnergyGridAgent("EnergyAgent")
    env = EnvironmentalMonitoringAgent("EnvironmentAgent")

    log.append("===== SIMULATION START =====")

    if traffic.detect_congestion(vehicle_count, log):
        traffic.request_coordination(coordinator, log)
    else:
        log.append("[Traffic] No action (below threshold)")

    if energy.detect_peak_load(load_value, log):
        energy.request_coordination(coordinator, log)
    else:
        log.append("[Energy] No action (below threshold)")

    if env.detect_pollution(aqi, log):
        env.request_coordination(coordinator, log)
    else:
        log.append("[Environment] No action (below threshold)")

    log.append("===== SIMULATION END =====")

    st.subheader("System Log")
    st.code("\n".join(log), language="text")
else:
    st.info("Set values using the sliders, then click **Run Simulation** to see message passing.")