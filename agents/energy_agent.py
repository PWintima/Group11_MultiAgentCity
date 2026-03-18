from agents.base_agent import Agent
from models.request import Request
from agents.coordinator import THRESHOLDS

class EnergyGridAgent(Agent):  # Energy grid agent
    def detect_peak_load(self, load_value, log):
        log.append(f"[Energy] load_value = {load_value}")
        return load_value > THRESHOLDS["PEAK_LOAD"]

    def request_coordination(self, coordinator, load_value, log):
        priority = min(10, int(load_value / 10))
        req = Request("REQ-E1", self, priority, "PEAK_LOAD")
        self.send_message(coordinator, req, log)

    def receive_message(self, decision, log):
        log.append(f"[Energy] Decision received: {decision}")
        if decision == "APPROVED":
            log.append("[Energy] Action: Applying load balancing")
