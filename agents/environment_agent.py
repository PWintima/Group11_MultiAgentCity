from agents.base_agent import Agent
from models.request import Request
from agents.coordinator import THRESHOLDS

class EnvironmentalMonitoringAgent(Agent):  # Environmental monitoring agent
    def detect_pollution(self, aqi, log):
        log.append(f"[Environment] AQI = {aqi}")
        if aqi > THRESHOLDS["HIGH_POLLUTION"]:
            log.append("[Environment] ⚠️ High pollution detected! Requesting coordination...")
            return True
        else:
            log.append("[Environment] ✓ Air quality is acceptable")
            return False

    def request_coordination(self, coordinator, aqi, log):
        priority = min(10, int(aqi / 10))
        req = Request("REQ-ENV1", self, priority, "HIGH_POLLUTION")
        self.send_message(coordinator, req, log)

    def receive_message(self, decision, log):
        log.append(f"[Environment] Decision received: {decision}")
        if decision == "APPROVED":
            log.append("[Environment] Action: Triggering environmental alert")
